import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://localhost:5173/quote';
const PROFILE = 'C:\\Users\\HOTEL LOBBY\\AppData\\Local\\Temp\\opencode\\chrome-quote';

const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
};

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  userDataDir: PROFILE,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--window-size=1280,900'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });

const consoleErrors = [];
page.on('pageerror', (e) => consoleErrors.push(String(e)));
page.on('console', (m) => {
  if (m.type() === 'error') consoleErrors.push(m.text());
});

// Force the download path (headless has no share sheet) and capture the blob.
await page.evaluateOnNewDocument(() => {
  Object.defineProperty(navigator, 'share', { get: () => undefined, configurable: true });
  window.__blobUrl = null;
  const orig = HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click = function () {
    if (this.download && this.href.startsWith('blob:')) window.__blobUrl = this.href;
    return orig.call(this);
  };
});

await page.goto(URL, { waitUntil: 'networkidle0' });
check('loads /quote', (await page.title()).includes('Get a Quote'), await page.title());

// Fill the form
await page.type('#q-name', 'Test Customer');
await page.type('#q-email', 'test@example.com');
await page.type('#q-phone', '0712345678');

await page.select('#q-service', 'Website Development');
await page.waitForSelector('fieldset input[type="checkbox"]', { timeout: 5000 });

const items = await page.$$eval('fieldset label', (els) =>
  els.map((el) => el.querySelector('span')?.textContent?.trim() ?? ''),
);
check('item picker appears', items.length >= 2, `${items.length} items offered`);

// Tick only the first two items
await page.$$eval('fieldset input[type="checkbox"]', (inputs) => {
  inputs[0].click();
  inputs[1].click();
});
const ticked = await page.$$eval('fieldset label', (els) =>
  els.filter((el) => el.querySelector('input')?.checked).map((el) => el.querySelector('span')?.textContent?.trim()),
);
check('two items selected', ticked.length === 2, ticked.join(' | '));

const selected = ticked;
const unselected = items.filter((i) => !selected.includes(i));

// Submit
await page.click('button[type="submit"]');
await page.waitForFunction(() => window.__blobUrl !== null, { timeout: 15000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 1500));

const blobUrl = await page.evaluate(() => window.__blobUrl);
check('PDF produced (download captured)', !!blobUrl, blobUrl ?? 'no blob');

if (blobUrl) {
  const pdfText = await page.evaluate(async (url) => {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    return Array.from(new Uint8Array(buf))
      .map((b) => (b >= 32 && b < 127 ? String.fromCharCode(b) : ' '))
      .join('');
  }, blobUrl);

  for (const item of selected) {
    check(`PDF contains selected: ${item}`, pdfText.includes(item));
  }
  for (const item of unselected) {
    check(`PDF omits unselected: ${item}`, !pdfText.includes(item));
  }
}

// On-screen document should match the selection too
const docText = (await page.$eval('.quote-doc, [data-quote-doc], main', (el) => el.innerText)) ?? '';
for (const item of selected) check(`screen doc shows: ${item}`, docText.includes(item));
for (const item of unselected) check(`screen doc omits: ${item}`, !docText.includes(item));

check('status mentions PDF filename', /M-TECH-Quote-MT-/.test(docText), '');

// Validation: no items selected
await page.click('button[type="text"], button:has-text("New quote")').catch(() => {});
const resetBtn = await page.$$('button');
for (const b of resetBtn) {
  const t = await b.evaluate((el) => el.textContent ?? '');
  if (/New quote/i.test(t)) { await b.click(); break; }
}
await page.waitForSelector('#q-name', { timeout: 5000 }).catch(() => {});
await page.type('#q-name', 'Second Customer');
await page.type('#q-email', 'two@example.com');
await page.type('#q-phone', '0798765432');
await page.select('#q-service', 'Graphic Design & Branding');
await new Promise((r) => setTimeout(r, 300));
// Untick everything
await page.$$eval('fieldset input[type="checkbox"]', (inputs) => {
  inputs.forEach((i) => { if (i.checked) i.click(); });
});
await page.click('button[type="submit"]');
await new Promise((r) => setTimeout(r, 500));
const errText = await page.evaluate(() => document.body.innerText);
check('blocks submit with 0 items selected', /at least one item/i.test(errText));

check('no JS errors', consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' ~ '));

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
