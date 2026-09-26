// npm install --prefix /tmp/rivalword-web-qa playwright @axe-core/playwright
// Serve with python3 -m http.server 4173, then:
// NODE_PATH=/tmp/rivalword-web-qa/node_modules node tests/smoke.cjs
// Uses installed Chrome by default; set BROWSER_CHANNEL=chromium for Playwright Chromium.
const { chromium } = require("playwright");
const { default: AxeBuilder } = require("@axe-core/playwright");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({
    headless: true,
    channel: process.env.BROWSER_CHANNEL || "chrome",
  });
  const mainContext = await browser.newContext();
  const page = await mainContext.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(process.env.SITE_URL || "http://127.0.0.1:4173");
  assert.equal(await page.getByRole("heading", { level: 1 }).count(), 1);
  await page
    .getByRole("button", { name: "Retos por enlace", exact: true })
    .click({ timeout: 3000 });
  assert.match(await page.locator("#social-panel").innerText(), /a su ritmo/);
  await page.getByRole("button", { name: "Cara a cara", exact: true }).click();
  assert.match(await page.locator("#social-panel").innerText(), /mismo iPhone/);
  await page.getByRole("button", { name: "Amigos", exact: true }).click();
  assert.match(await page.locator("#social-panel").innerText(), /código/);
  await page.getByRole("button", { name: "Empezar demo", exact: true }).click();
  for (const answer of ["Hola", "Gracias", "Amigo"]) {
    await page.getByRole("button", { name: answer, exact: true }).click();
    await page.getByRole("button", { name: /Siguiente|Ver resultado/ }).click();
  }
  assert.match(await page.locator("#quiz").innerText(), /3 de 3/);
  await page.getByRole("button", { name: "Volver a jugar" }).click();
  assert.match(await page.locator("#quiz").innerText(), /1 de 3/);
  await page.getByRole("button", { name: "Adiós", exact: true }).click();
  assert.match(await page.locator("#quiz-feedback").innerText(), /Hola/);
  await page.getByRole("button", { name: "Francés", exact: true }).click();
  assert.match(await page.locator("#flash-word").innerText(), /Bonjour/);
  await page.getByRole("button", { name: "Mostrar traducción" }).click();
  assert.match(await page.locator("#flash-translation").innerText(), /Hola/);
  await page.locator(".flashcard").scrollIntoViewIfNeeded();
  const card = await page.locator(".flashcard").boundingBox();
  await page.mouse.move(card.x + 70, card.y + 150);
  await page.mouse.down();
  await page.mouse.move(card.x + 180, card.y + 150, { steps: 8 });
  await page.mouse.up();
  await page.waitForFunction(
    () => document.querySelector("#flash-word").textContent === "Merci",
  );
  const question = page.locator("#faq summary").first();
  await question.focus();
  await page.keyboard.press("Enter");
  assert.equal(
    await page.locator("#faq details").first().getAttribute("open"),
    "",
  );
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      true,
      `overflow at ${width}`,
    );
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  assert.equal(
    await page.getByRole("button", { name: "Abrir menú" }).isVisible(),
    false,
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await page
    .locator("#navigation")
    .getByRole("link", { name: "La Arena" })
    .click();
  assert.equal(
    await page
      .getByRole("button", { name: "Abrir menú" })
      .getAttribute("aria-expanded"),
    "false",
  );
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    assert.deepEqual(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
      [],
      `accessibility at ${width}`,
    );
  }
  const broken = await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="#"]')]
      .filter((a) => !document.getElementById(a.getAttribute("href").slice(1)))
      .map((a) => a.outerHTML),
  );
  assert.deepEqual(broken, []);
  for (const img of await page.locator("img[loading=lazy]").all())
    await img.scrollIntoViewIfNeeded();
  await page.evaluate(() =>
    Promise.all([...document.images].map((i) => i.decode())),
  );
  assert.deepEqual(
    await page.evaluate(() =>
      [...document.images]
        .filter((i) => !i.complete || !i.naturalWidth)
        .map((i) => i.src),
    ),
    [],
  );
  assert.deepEqual(errors, []);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(() => {
    document.activeElement.blur();
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.screenshot({ path: "/tmp/rivalword-desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "/tmp/rivalword-mobile.png", fullPage: true });
  const context = await browser.newContext({ javaScriptEnabled: false });
  const plain = await context.newPage();
  await plain.goto(process.env.SITE_URL || "http://127.0.0.1:4173");
  assert.equal(
    await plain.getByRole("heading", { level: 1 }).isVisible(),
    true,
  );
  assert.equal(
    await plain
      .locator("#navigation")
      .getByRole("link", { name: "La Arena" })
      .isVisible(),
    true,
  );
  await browser.close();
  console.log(
    "PASS: demos, social explorer, mobile menu, 6 widths, accessibility, links, images, no-JS and console.",
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
