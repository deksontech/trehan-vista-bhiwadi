import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
      IMAGES: {
        input() {
          return {
            transform() {
              return {
                async output() {
                  return { response: () => new Response("image") };
                },
              };
            },
          };
        },
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Trehan Vista landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Premium 2, 3 and 4 BHK Apartments in Bhiwadi/);
  assert.match(html, /₹24\.25 Lakh\*/);
  assert.match(html, /₹34 Lakh\*/);
  assert.match(html, /Price on Request/);
  assert.match(html, /Sector 54/);
  assert.match(html, /SH-25, Alwar-Bhiwadi Highway/);
  assert.doesNotMatch(html, /21\.99|32\.99|codex-preview|react-loading-skeleton/i);
});

test("server-renders legal pages", async () => {
  const privacy = await render("/privacy-policy");
  const disclaimer = await render("/disclaimer");

  assert.equal(privacy.status, 200);
  assert.equal(disclaimer.status, 200);
});
