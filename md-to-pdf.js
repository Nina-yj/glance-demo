const { marked } = require('marked');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const inputFile = process.argv[2];
const outputFile = process.argv[3];

const md = fs.readFileSync(inputFile, 'utf-8');
const body = marked(md);

const html = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap');
  body {
    font-family: 'Noto Sans KR', -apple-system, sans-serif;
    font-size: 13px;
    color: #1A202C;
    line-height: 1.7;
    padding: 40px 52px;
    max-width: 800px;
  }
  h1 { font-size: 22px; font-weight: 700; color: #6B4EFF; border-bottom: 2px solid #6B4EFF; padding-bottom: 8px; margin: 28px 0 16px; }
  h2 { font-size: 17px; font-weight: 700; margin: 24px 0 10px; color: #1A202C; }
  h3 { font-size: 14px; font-weight: 600; margin: 18px 0 8px; color: #2D3748; }
  h4 { font-size: 13px; font-weight: 600; margin: 14px 0 6px; color: #4A5568; }
  p  { margin: 6px 0 10px; }
  code {
    background: #EDEEFF;
    color: #6B4EFF;
    padding: 1px 5px;
    border-radius: 4px;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 12px;
  }
  pre {
    background: #1A202C;
    color: #E2E8F0;
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    font-size: 11.5px;
    line-height: 1.6;
    margin: 12px 0;
  }
  pre code { background: none; color: inherit; padding: 0; }
  table { border-collapse: collapse; width: 100%; margin: 12px 0; font-size: 12px; }
  th { background: #6B4EFF; color: #fff; padding: 8px 12px; text-align: left; }
  td { padding: 7px 12px; border-bottom: 1px solid #E2E8F0; }
  tr:nth-child(even) td { background: #F7F7FF; }
  blockquote { border-left: 4px solid #6B4EFF; margin: 12px 0; padding: 8px 16px; background: #EDEEFF; border-radius: 0 8px 8px 0; color: #4A5568; }
  ul, ol { padding-left: 20px; margin: 6px 0; }
  li { margin: 3px 0; }
  hr { border: none; border-top: 1px solid #E2E8F0; margin: 24px 0; }
  a { color: #6B4EFF; }
</style>
</head>
<body>${body}</body>
</html>`;

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: outputFile,
    format: 'A4',
    margin: { top: '20mm', bottom: '20mm', left: '0mm', right: '0mm' },
    printBackground: true,
  });
  await browser.close();
  console.log(`PDF saved: ${outputFile}`);
})();
