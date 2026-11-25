// Entry for the make.fun bounty "Have You Tried Turning It Off?"
// (slug: u-motasimfuad-have-you-tried-turning-it-off-154a938b).
//
// The whole entry is one line of text: a hopeless tech-support agent's
// reply to a desperate customer. Running this program writes that line
// to entry.txt inside the output directory the grader provides
// (MAKEFUN_OUTPUT_DIR), or in this file's own directory when that
// variable is not set. The program is deterministic: it reads no
// input files and uses no clock, no randomness and no network.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "Have you tried turning it off and on again? Perfect — that's step one. Step two is the same thing, and honestly, so is my entire career.";

function main(): void {
  // This bounty's gate accepts UTF-8 text of 1 to 199 characters.
  if (LINE.length < 1 || LINE.length > 199) {
    throw new Error(
      `entry line is ${LINE.length} characters, outside the 1-199 gate`,
    );
  }
  const here = dirname(fileURLToPath(import.meta.url));
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? here;
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  const payload = LINE + "\n";
  const bytes = Buffer.from(payload, "utf8");
  writeFileSync(outPath, bytes);
  const back = readFileSync(outPath);
  if (!back.equals(bytes)) {
    throw new Error("entry.txt read back does not match the bytes written");
  }
  console.log(`wrote ${bytes.length} bytes to ${outPath}`);
}

main();
