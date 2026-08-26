import { cache } from 'react';
import matter from 'gray-matter';
import { marked } from 'marked';
import { GIST_USER } from '@/lib/site';
import { gistGithubHeaders } from '@/lib/github_gist';

const ARTICLE_PREFIX = 'articles-';
const GISTS_ENDPOINT = `https://api.github.com/users/${GIST_USER}/gists?per_page=100`;

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: readonly string[];
}

export interface Article extends ArticleMeta {
  html: string;
}

interface FrontMatter {
  title?: string;
  description?: string;
  date?: string;
  tags?: readonly string[];
  slug?: string;
}

interface GistFile {
  filename: string;
  raw_url: string;
}

interface Gist {
  id: string;
  files: Record<string, GistFile>;
}

function fileToSlug(filename: string): string {
  return filename.slice(ARTICLE_PREFIX.length).replace(/\.md$/, '');
}

function isArticleFile(filename: string): boolean {
  return filename.startsWith(ARTICLE_PREFIX) && filename.endsWith('.md');
}

async function fetchArticleFiles(): Promise<GistFile[]> {
  const res = await fetch(GISTS_ENDPOINT, { headers: gistGithubHeaders() });
  if (!res.ok) {
    throw new Error(
      `Failed to list gists for "${GIST_USER}": ${res.status} ${res.statusText}`,
    );
  }

  const gists = (await res.json()) as Gist[];
  return gists
    .flatMap((gist) => Object.values(gist.files))
    .filter((file) => isArticleFile(file.filename));
}

async function fetchArticle(file: GistFile): Promise<Article> {
  const res = await fetch(file.raw_url, { headers: gistGithubHeaders() });
  if (!res.ok) {
    throw new Error(
      `Failed to fetch gist article "${file.filename}": ${res.status} ${res.statusText}`,
    );
  }

  const { data, content } = matter(await res.text());
  const front: FrontMatter = data;
  const slug = front.slug ?? fileToSlug(file.filename);

  return {
    slug,
    title: front.title ?? slug,
    description: front.description ?? '',
    date: front.date ?? '',
    tags: front.tags ?? [],
    html: marked.parse(content, { async: false }),
  };
}

const loadArticles = cache(async (): Promise<Article[]> => {
  const files = await fetchArticleFiles();
  const articles = await Promise.all(files.map(fetchArticle));
  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
});

export async function getArticleSlugs(): Promise<string[]> {
  const articles = await loadArticles();
  return articles.map((article) => article.slug);
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  const articles = await loadArticles();
  return articles.find((article) => article.slug === slug);
}

/** Returns article metadata (no rendered HTML) sorted newest first. */
export async function getAllArticleMeta(): Promise<ArticleMeta[]> {
  const articles = await loadArticles();
  return articles.map(({ html, ...meta }) => {
    void html;
    return meta;
  });
}
