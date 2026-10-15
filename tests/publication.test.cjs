const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('the main download actions open the App Store directly', () => {
  const page = read('index.html');
  const store = 'https://apps.apple.com/app/id6815879332';
  assert.match(page, new RegExp(`class="[^"]*nav-cta[^"]*" href="${store}"`));
  assert.match(page, new RegExp(`class="[^"]*hero-store[^"]*" href="${store}"`));
});

test('visitors can find cookie information without an active signup form', () => {
  const page = read('index.html');
  assert.match(page, /href="\/cookies\/"/);
  assert.match(page, /id="newsletter"/);
  assert.doesNotMatch(page, /sibforms\.com|<form[\s>]/);
  assert.match(read('cookies/index.html'), /Cloudflare/);
});

test('the blog has a crawlable guide and no third-party font request', () => {
  const home = read('index.html');
  const blog = read('blog/index.html');
  const guide = read('blog/como-recordar-vocabulario/index.html');
  const sitemap = read('sitemap.xml');
  assert.match(home, /href="\/blog\/"/);
  assert.match(blog, /href="\/blog\/como-recordar-vocabulario\/"/);
  assert.match(guide, /<link rel="canonical" href="https:\/\/rivalword\.online\/blog\/como-recordar-vocabulario\/"/);
  assert.match(sitemap, /\/blog\/como-recordar-vocabulario\//);
  assert.doesNotMatch(home, /fonts\.googleapis\.com/);
});
