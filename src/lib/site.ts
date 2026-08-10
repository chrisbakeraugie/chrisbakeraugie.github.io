const PRODUCTION_URL = 'https://chrisjbaker.dev';
const DEVELOPMENT_URL = 'http://localhost:3000';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === 'development' ? DEVELOPMENT_URL : PRODUCTION_URL);

export const GIST_USER = process.env.NEXT_PUBLIC_GIST_USER ?? 'chrisbakeraugie';

export const AUTHOR = {
  name: 'Chris Baker',
  role: 'Fullstack Developer',
  tagline: 'Fullstack developer as comfortable in the code as on the call',
  intro:
    'Fullstack developer with 5+ years shipping production software end to end. Specialized in TypeScript, React, Node.js, and AWS, with a track record spanning rapid proof-of-concept builds through multi-year product ownership.',
  location: 'United States',
  email: 'chrisbakerdev@gmail.com',
  github: 'https://github.com/chrisbakeraugie',
} as const;
