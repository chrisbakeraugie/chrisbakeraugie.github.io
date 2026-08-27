import { getRawResume } from '@/lib/resume';

export const dynamic = 'force-static';

/**
 * Emits the canonical JSON Resume at `/resume.json` as a static file at build
 * time. Same source of truth (gist) as the human-readable resume link — bots
 * and tooling can consume this without going through jsonresume.org.
 */
export async function GET(): Promise<Response> {
  const resume = await getRawResume();
  return Response.json(resume);
}
