// Guoshi — China National Statistics Atlas: the hand-in program.
//
// The site itself is the static app/ folder beside this file (plain HTML,
// CSS and ES modules, no build step, nothing loaded over the network).
// This program delivers it: it copies app/ and screenshots/ into the
// output directory and writes dossier.json there with buildDossier from
// the vendored make.fun library, which must stay byte-identical to the
// kit's copy — the scorer rebuilds the dossier with its own copy and
// compares the two byte for byte.
//
// Run locally (Node 22, standard library only):
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// In the grader, /output is used when MAKEFUN_OUTPUT_DIR is not set.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoDir = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
cpSync(join(repoDir, 'app'), join(outputDir, 'app'), { recursive: true });

const shotsDir = join(outputDir, 'screenshots');
mkdirSync(shotsDir, { recursive: true });
if (existsSync(join(repoDir, 'screenshots'))) {
  cpSync(join(repoDir, 'screenshots'), shotsDir, { recursive: true });
}

// The dossier caps mirror the scorer's own limits: at most 4 screenshots
// of 256 KiB each, at most 993 files and 16 MiB under app/, and the
// dossier text capped at 160 KiB.
const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outputDir, 'dossier.json'), dossier);
console.log(`guoshi: handed in app/ and screenshots/ with a ${dossier.length}-byte dossier.json at ${outputDir}`);
