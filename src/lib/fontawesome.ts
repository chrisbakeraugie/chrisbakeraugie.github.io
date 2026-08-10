import { config } from '@fortawesome/fontawesome-svg-core';

// SVG icons only — skip the runtime CSS injector. Base styles are imported once
// in layout.tsx so icons render correctly in static HTML with no client JS.
config.autoAddCss = false;
