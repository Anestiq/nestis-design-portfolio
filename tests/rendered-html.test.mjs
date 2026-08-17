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
  assert.match(html, /href="https:\/\/t\.me\/Anestiq"/);
  assert.match(html, /src="\/_next\/image\?url=%2Fimages%2Fnox%2Fnox-cover\.png/);
  assert.match(html, /og-v2\.png/);
  assert.match(html, /NOX TRAINING/);
  assert.match(html, /href="\/showcase\/nox-training"/);
  assert.match(html, /AITHER ARCHITECTS/);
  assert.match(html, /href="\/showcase\/aither-architects"/);
  assert.match(html, /Четыре проекта/);
  assert.match(html, /@Anestiq/);
  assert.match(html, /КРАСНОДАР/);
  assert.doesNotMatch(html, /hello@anestis\.dev/);
  assert.doesNotMatch(html, /NØRDICA/);
  assert.doesNotMatch(html, /SYNTHESIS/);
  assert.doesNotMatch(html, /TERRA/);
});

test("renders every portfolio case route", async () => {
  for (const [slug, title] of [["nox-training", "РАБОТАЕМ"], ["aither-architects", "ПРОСТРАНСТВА"]]) {
    const response = await render(`/showcase/${slug}`);
    assert.equal(response.status, 200);
    assert.match(await response.text(), new RegExp(title));
  }
});

test("removed portfolio routes return 404", async () => {
  for (const slug of ["nordica", "synthesis", "terra"]) {
    assert.equal((await render(`/showcase/${slug}`)).status, 404);
  }
});

test("renders AITHER with its sections and route metadata", async () => {
  const response = await render("/showcase/aither-architects");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /AITHER ARCHITECTS \| проект Anestis/);
  assert.match(html, /ПРОПОРЦИЯ.*ВНЕ ВРЕМЕНИ/s);
  assert.match(html, /VILLA ARKO/);
  assert.match(html, /НАЧНЁМ.*С МЕСТА/s);
  assert.match(html, /images\/aither\/hero\.png/);
  assert.doesNotMatch(html, /og-v2\.png/);
});

test("renders NOX route with product sections and route metadata", async () => {
  const response = await render("/showcase/nox-training");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /NOX TRAINING \| проект Anestis/);
  assert.match(html, /STRENGTH/);
  assert.match(html, /ГОРОД СПИТ/);
  assert.match(html, /nox-og\.png/);
});

test("renders the footwear storefront and checkout", async () => {
  const shop = await render("/shop");
  assert.equal(shop.status, 200);
  const shopHtml = await shop.text();
  assert.match(shopHtml, /ТВОЯ/);
  assert.match(shopHtml, /ПАРА\./);
  assert.match(shopHtml, /КАТАЛОГ \/ .*18.* МОДЕЛЕЙ/);
  assert.match(shopHtml, /Vector 09/);
  assert.match(shopHtml, /para-og\.png/);

  const checkout = await render("/shop/checkout");
  assert.equal(checkout.status, 200);
  assert.match(await checkout.text(), /ОФОРМЛЕНИЕ \/ ДЕМО/);
});

test("renders representative product routes with product metadata", async () => {
  for (const [slug, title, brand] of [["vector-black", "Vector 09", "NORTH/FORM"], ["ridge-moss", "Ridge Moss", "ALTITUDE"]]) {
    const response = await render(`/shop/${slug}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(title));
    assert.match(html, new RegExp(brand.replace("/", "\\/")));
    assert.match(html, new RegExp(`<title>${title} — ${brand.replace("/", "\\/")} \\| ПАРА</title>`));
  }
});
