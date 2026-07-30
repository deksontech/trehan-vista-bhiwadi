import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("standard Next.js standalone output exists", async () => {
  await access(new URL("../.next/", import.meta.url));
  await access(new URL("../.next/standalone/", import.meta.url));
  await access(new URL("../.next/standalone/server.js", import.meta.url));
});

test("project data keeps verified Trehan Vista content", async () => {
  const project = await readFile(new URL("../src/data/project.ts", import.meta.url), "utf8");

  assert.match(project, /₹24\.25 Lakh\*/);
  assert.match(project, /₹34 Lakh\*/);
  assert.match(project, /Price on Request/);
  assert.match(project, /Sector 54/);
  assert.match(project, /SH-25, Alwar-Bhiwadi Highway/);
  assert.match(project, /\+917543062176/);
  assert.match(project, /info@trehanvistabhiwadi\.com/);
  assert.doesNotMatch(project, /21\.99|32\.99|contact@trehanvistagroup\.com|99831/);
});
