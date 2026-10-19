import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9222;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  const screenshotsDir = path.resolve('report/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const chrome = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1366,768',
    'about:blank'
  ]);

  await sleep(2000);

  async function sendCommand(ws, method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = Math.floor(Math.random() * 1000000);
      const handler = (event) => {
        const data = JSON.parse(event.data);
        if (data.id === id) {
          ws.removeEventListener('message', handler);
          if (data.error) reject(data.error);
          else resolve(data.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  const targetsRes = await fetch(`http://127.0.0.1:${PORT}/json/list`);
  const targets = await targetsRes.json();
  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  await new Promise(r => ws.addEventListener('open', r));
  await sendCommand(ws, 'Page.enable');
  await sendCommand(ws, 'Runtime.enable');
  await sendCommand(ws, 'Emulation.setDeviceMetricsOverride', {
    width: 1366,
    height: 768,
    deviceScaleFactor: 1,
    mobile: false
  });

  // 1. Home
  await sendCommand(ws, 'Page.navigate', { url: 'http://127.0.0.1:4173/' });
  await sendCommand(ws, 'Runtime.evaluate', { expression: `sessionStorage.setItem("lamiwood-preloader-shown", "true");` });
  await sleep(1500);
  await sendCommand(ws, 'Runtime.evaluate', { expression: `const p = document.querySelector('.fixed.inset-0.z-\\[9999\\]'); if (p) p.remove();` });
  let shot = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png', quality: 95 });
  fs.writeFileSync(path.join(screenshotsDir, 'home.png'), Buffer.from(shot.data, 'base64'));

  // 2. Products
  await sendCommand(ws, 'Page.navigate', { url: 'http://127.0.0.1:4173/products' });
  await sleep(1500);
  await sendCommand(ws, 'Runtime.evaluate', { expression: `const p = document.querySelector('.fixed.inset-0.z-\\[9999\\]'); if (p) p.remove();` });
  shot = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png', quality: 95 });
  fs.writeFileSync(path.join(screenshotsDir, 'products.png'), Buffer.from(shot.data, 'base64'));

  // 3. Product Detail (natural-oak-flooring)
  await sendCommand(ws, 'Page.navigate', { url: 'http://127.0.0.1:4173/products/natural-oak-flooring' });
  await sleep(1800);
  await sendCommand(ws, 'Runtime.evaluate', { expression: `const p = document.querySelector('.fixed.inset-0.z-\\[9999\\]'); if (p) p.remove();` });
  shot = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png', quality: 95 });
  fs.writeFileSync(path.join(screenshotsDir, 'product_detail.png'), Buffer.from(shot.data, 'base64'));

  // 4. Pattern Designer
  await sendCommand(ws, 'Page.navigate', { url: 'http://127.0.0.1:4173/pattern-designer' });
  await sleep(1500);
  await sendCommand(ws, 'Runtime.evaluate', { expression: `const p = document.querySelector('.fixed.inset-0.z-\\[9999\\]'); if (p) p.remove();` });
  shot = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png', quality: 95 });
  fs.writeFileSync(path.join(screenshotsDir, 'pattern_designer.png'), Buffer.from(shot.data, 'base64'));

  // 5. Calculator (populate some fields)
  await sendCommand(ws, 'Page.navigate', { url: 'http://127.0.0.1:4173/calculator' });
  await sleep(1500);
  await sendCommand(ws, 'Runtime.evaluate', { expression: `const p = document.querySelector('.fixed.inset-0.z-\\[9999\\]'); if (p) p.remove();` });
  // Click room type or enter dimensions if available
  await sendCommand(ws, 'Runtime.evaluate', {
    expression: `
      const select = document.querySelector('select');
      if (select && select.options.length > 1) { select.selectedIndex = 1; select.dispatchEvent(new Event('change', { bubbles: true })); }
    `
  });
  await sleep(600);
  shot = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png', quality: 95 });
  fs.writeFileSync(path.join(screenshotsDir, 'calculator.png'), Buffer.from(shot.data, 'base64'));

  // 6. Compare (select two items)
  await sendCommand(ws, 'Page.navigate', { url: 'http://127.0.0.1:4173/compare' });
  await sleep(1500);
  await sendCommand(ws, 'Runtime.evaluate', { expression: `const p = document.querySelector('.fixed.inset-0.z-\\[9999\\]'); if (p) p.remove();` });
  await sendCommand(ws, 'Runtime.evaluate', {
    expression: `
      const cards = document.querySelectorAll('button, div[role="button"]');
      let clicked = 0;
      for (const c of cards) {
        if (c.innerText && (c.innerText.includes('Flooring') || c.innerText.includes('Panel'))) {
          c.click();
          clicked++;
          if (clicked >= 2) break;
        }
      }
    `
  });
  await sleep(800);
  shot = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png', quality: 95 });
  fs.writeFileSync(path.join(screenshotsDir, 'compare.png'), Buffer.from(shot.data, 'base64'));

  // 7. About page
  await sendCommand(ws, 'Page.navigate', { url: 'http://127.0.0.1:4173/about' });
  await sleep(1500);
  await sendCommand(ws, 'Runtime.evaluate', { expression: `const p = document.querySelector('.fixed.inset-0.z-\\[9999\\]'); if (p) p.remove();` });
  shot = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png', quality: 95 });
  fs.writeFileSync(path.join(screenshotsDir, 'about.png'), Buffer.from(shot.data, 'base64'));

  // 8. Contact page
  await sendCommand(ws, 'Page.navigate', { url: 'http://127.0.0.1:4173/contact' });
  await sleep(1500);
  await sendCommand(ws, 'Runtime.evaluate', { expression: `const p = document.querySelector('.fixed.inset-0.z-\\[9999\\]'); if (p) p.remove();` });
  shot = await sendCommand(ws, 'Page.captureScreenshot', { format: 'png', quality: 95 });
  fs.writeFileSync(path.join(screenshotsDir, 'contact.png'), Buffer.from(shot.data, 'base64'));

  ws.close();
  chrome.kill();
  console.log('Updated screenshots captured successfully!');
}

run().catch(console.error);
