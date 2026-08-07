const PRODUCTION_URL = 'https://chrisjbaker.dev';
const DEVELOPMENT_URL = 'http://localhost:3000';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === 'development' ? DEVELOPMENT_URL : PRODUCTION_URL);

export const GIST_USER = process.env.NEXT_PUBLIC_GIST_USER ?? 'chrisbakeraugie';

export const AUTHOR = {
  name: 'Chris Baker',
  role: 'Full-stack Software Engineer',
  tagline: '',
  location: 'United States',
} as const;
