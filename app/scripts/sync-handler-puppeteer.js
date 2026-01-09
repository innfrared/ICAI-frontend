import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function syncDataWithPuppeteer() {
  let browser;
  
  try {
    browser = await puppeteer.launch({
      headless: false,
      userDataDir: undefined,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const pages = await browser.pages();
    const page = pages[0] || await browser.newPage();
    const cookies = await page.cookies();
    const allCookies = {};
    
    cookies.forEach((cookie) => {
      allCookies[cookie.name] = {
        value: cookie.value,
        domain: cookie.domain,
        path: cookie.path,
        expires: cookie.expires,
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        sameSite: cookie.sameSite,
      };
    });

    const data = {
      timestamp: new Date().toISOString(),
      cookies: allCookies,
      cookieCount: Object.keys(allCookies).length,
      domains: [...new Set(cookies.map(c => c.domain))],
    };

    const projectRoot = path.resolve(__dirname, '../..');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `all-cookies-export-${timestamp}.json`;
    const filepath = path.join(projectRoot, filename);

    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');

    await browser.close();
    return filepath;
  } catch (error) {
    if (browser) {
      await browser.close();
    }
    throw error;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  syncDataWithPuppeteer().catch(console.error);
}

