const puppeteer = require('puppeteer');
const path = require('path');

const url = `file:///${path.resolve(__dirname, 'landing.html').replace(/\\/g, '/')}`;
const out = path.join(__dirname, 'landing-preview.png');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle0' });

  // Force all scroll-reveal elements visible (IntersectionObserver doesn't fire in headless full-page capture)
  await page.evaluate(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      el.style.transition = 'none';
      el.classList.add('visible');
    });
  });
  await new Promise(r => setTimeout(r, 300));

  await page.screenshot({ path: out, fullPage: true });
  await browser.close();
  console.log('저장됨:', out);
})();
