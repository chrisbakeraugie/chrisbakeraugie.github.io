import { GIST_USER } from '@/lib/site';

/**
 * Headers for GitHub gist API requests at build time.
 * Uses `GIST_GITHUB_TOKEN` when set (optional PAT with gist read scope).
 * Does not use `GITHUB_TOKEN` — Actions' repo token cannot list user gists (403).
 */
export function gistGithubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': `${GIST_USER}-portfolio-build`,
  };
  const token = process.env.GIST_GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}
