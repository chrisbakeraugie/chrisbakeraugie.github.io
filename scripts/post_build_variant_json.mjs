#!/usr/bin/env node
// Rename extensionless variant JSON files under out/api/resume/ to add a
// `.json` suffix. GitHub Pages derives Content-Type from the filename
// extension and serves extensionless files as application/octet-stream —
// which makes /api/resume/<slug> unreadable to JSON-expecting agents.
// Next 16's static export writes these files without an extension because
// the route segment is `[variant]/route.ts` (the only shape that satisfies
// both the [bracket] typing bug and generateStaticParams under output:'export').
// The fix is a targeted post-build rename; idempotent so repeat runs are safe.

import { readdir, rename, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';

const VARIANT_DIR = new URL('../out/api/resume/', import.meta.url);

async function main() {
  let entries;
  try {
    entries = await readdir(VARIANT_DIR);
  } catch (err) {
    if (err && err.code === 'ENOENT') {
      console.log(
        'post_build_variant_json: no out/api/resume/ directory; nothing to do.',
      );
      return;
    }
    throw err;
  }

  let renamed = 0;
  for (const name of entries) {
    if (extname(name) !== '') continue;
    const src = join(VARIANT_DIR.pathname, name);
    const info = await stat(src);
    if (!info.isFile()) continue;
    const dst = `${src}.json`;
    await rename(src, dst);
    console.log(`post_build_variant_json: renamed ${name} -> ${name}.json`);
    renamed += 1;
  }

  if (renamed === 0) {
    console.log(
      'post_build_variant_json: no extensionless variant files found.',
    );
  } else {
    console.log(`post_build_variant_json: renamed ${renamed} file(s).`);
  }
}

main().catch((err) => {
  console.error('post_build_variant_json failed:', err);
  process.exit(1);
});
