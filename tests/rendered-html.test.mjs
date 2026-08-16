import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the portfolio home page and its primary actions", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /Сайты с идеей\./);
  assert.match(html, /Код с характером\./);
  assert.match(html, /href="#work"/);
  assert.match(html, /href="https:\/\/t\.me\/anestis"/);
  assert.match(html, /src="\/_next\/image\?url=%2Fimages%2Fproject-nordica\.webp/);
  assert.match(html, /og-v2\.png/);
});

test("renders every portfolio case route", async () => {
  for (const [slug, title] of [["nordica", "NØRDICA"], ["synthesis", "SYNTHESIS"], ["terra", "TERRA"]]) {
    const response = await render(`/showcase/${slug}`);
    assert.equal(response.status, 200);
    assert.match(await response.text(), new RegExp(title));
  }
});
