import { getVariant, getVariantSlugs } from '@/lib/resume';

export const dynamic = 'force-static';
export const dynamicParams = false;

/**
 * Static JSON Resume for each audience variant, emitted at build to
 * `/api/resume/<slug>`. Response is a JSON Resume payload with an
 * audience-tailored `basics.summary` and per-work `portfolioHighlights`, plus
 * a `meta.audience` block identifying the variant.
 *
 * Lives under `/api/` because Next 16 requires `generateStaticParams` at the
 * segment that owns the dynamic bracket — placing route.ts as the leaf of
 * `[variant]/` is the well-trodden pattern; nesting it under a static
 * subdirectory of `[variant]` trips a `generateStaticParams` detection issue.
 */

interface RouteParams {
  params: Promise<{ variant: string }>;
}

/**
 * Next 16 with `output: 'export'` treats an empty `generateStaticParams`
 * return value as "missing" and errors the build. Until at least one
 * `resume-overlay-<slug>.json` gist exists, we emit a sentinel slug that
 * `GET` handles as a 404 — keeps the code path exercised without shipping
 * a bogus variant.
 */
const NO_VARIANTS_SENTINEL = '_none';

export async function generateStaticParams(): Promise<
  Array<{ variant: string }>
> {
  const slugs = await getVariantSlugs();
  if (slugs.length === 0) return [{ variant: NO_VARIANTS_SENTINEL }];
  return slugs.map((variant) => ({ variant }));
}

export async function GET(
  _request: Request,
  { params }: RouteParams,
): Promise<Response> {
  const { variant } = await params;
  const v = await getVariant(variant);
  if (!v) return new Response(null, { status: 404 });
  return Response.json(v.merged);
}
