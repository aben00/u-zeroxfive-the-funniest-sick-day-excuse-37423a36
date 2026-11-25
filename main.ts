// The Funniest Sick-Day Excuse — make.fun entry
// Writes exactly one line (under 200 characters) to /output/entry.txt.
// Deterministic: the same text on every run, no randomness, no network,
// no model call. The line is a single sick-day excuse, nothing else.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY =
  "I can't come in today — my knees held an emergency meeting this morning and voted unanimously for bed rest.";

// The sealed gate requires UTF-8 text of 1 to 200 characters, not only
// whitespace, on a single line. Fail loudly instead of writing an entry
// that could never be judged.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`Entry must be 1-200 characters, got ${ENTRY.length}`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("Entry must be a single non-blank line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} characters to ${outPath}`);
