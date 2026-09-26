// Same setup as smoke.cjs; tests the real pointer gesture before release.
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({
    channel: process.env.BROWSER_CHANNEL || "chrome",
  });
  const page = await browser.newPage({
    viewport: { width: 1100, height: 900 },
  });
  await page.goto(process.env.SITE_URL || "http://127.0.0.1:4173");
  await page.getByRole("button", { name: "Francés", exact: true }).click();
  const card = page.locator(".flashcard");
  await card.scrollIntoViewIfNeeded();
  const box = await card.boundingBox();
  const x = box.x + box.width / 2,
    y = box.y + box.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 85, y + 5, { steps: 8 });
  assert.ok(
    (await card.boundingBox()).x > box.x + 50,
    "Card must follow the pointer before release",
  );
  assert.match(await page.locator(".swipe-stamp").innerText(), /Aprendida/);
  await page.mouse.up();
  await page.waitForFunction(
    () => document.querySelector("#flash-word").textContent === "Merci",
  );
  await page.waitForFunction(
    () => document.querySelector(".flashcard").dataset.state === "idle",
  );
  // A short drag springs back without rating.
  const b = await card.boundingBox();
  await page.mouse.move(b.x + 100, b.y + 160);
  await page.mouse.down();
  await page.mouse.move(b.x + 115, b.y + 160);
  await page.mouse.up();
  assert.equal(await page.locator("#flash-word").innerText(), "Merci");
  await page.waitForFunction(
    () => document.querySelector(".flashcard").dataset.state === "idle",
  );
  await page.getByRole("button", { name: "No aprendida", exact: true }).click();
  await page.waitForFunction(
    () => document.querySelector("#flash-word").textContent === "Ami",
  );
  assert.match(
    await page.locator("#flash-status").innerText(),
    /No aprendida[\s\S]*Siguiente palabra: Ami/,
  );
  await page.waitForFunction(
    () => document.querySelector(".flashcard").dataset.state === "idle",
  );
  await card.focus();
  await page.keyboard.press("ArrowUp");
  await page.waitForFunction(
    () => document.querySelector("#flash-word").textContent === "Bonjour",
  );
  assert.match(await page.locator("#flash-status").innerText(), /Difícil/);
  await page.waitForFunction(
    () => document.querySelector(".flashcard").dataset.state === "idle",
  );
  await page.getByRole("button", { name: "Muy difícil", exact: true }).click();
  await page.waitForFunction(
    () => document.querySelector("#flash-word").textContent === "Merci",
  );
  await page.waitForFunction(
    () => document.querySelector(".flashcard").dataset.state === "idle",
  );
  // Reduced motion still advances immediately, without auto demonstration.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("button", { name: "Aprendida", exact: true }).click();
  assert.equal(await page.locator("#flash-word").innerText(), "Ami");
  await page.getByRole("button", { name: "Ver el gesto", exact: true }).click();
  assert.equal(await page.locator("#flash-word").innerText(), "Ami");
  assert.match(await page.locator("#flash-status").innerText(), /derecha/);
  await browser.close();
  console.log(
    "PASS: tracking, release, cancel, 4 directions, keyboard and reduced motion.",
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
