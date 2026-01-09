import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getAllCookiesFromChromeDatabase() {
  const platform = process.platform;
  const homeDir = os.homedir();
  
  let cookieDbPath = '';
  
  if (platform === 'darwin') {
    cookieDbPath = path.join(homeDir, 'Library', 'Application Support', 'Google', 'Chrome', 'Default', 'Cookies');
  } else if (platform === 'win32') {
    cookieDbPath = path.join(homeDir, 'AppData', 'Local', 'Google', 'Chrome', 'User Data', 'Default', 'Cookies');
  } else if (platform === 'linux') {
    cookieDbPath = path.join(homeDir, '.config', 'google-chrome', 'Default', 'Cookies');
  }
  
  if (!fs.existsSync(cookieDbPath)) {
    throw new Error(`Chrome cookie database not found at: ${cookieDbPath}`);
  }
  
  const tempDbPath = path.join(os.tmpdir(), `cookies-${Date.now()}.db`);
  fs.copyFileSync(cookieDbPath, tempDbPath);
  
  try {
    const db = new Database(tempDbPath, { readonly: true });
    
    const cookies = db.prepare(`
      SELECT 
        name,
        value,
        host_key as domain,
        path,
        expires_utc,
        is_secure,
        is_httponly,
        samesite,
        creation_utc,
        last_access_utc
      FROM cookies
      ORDER BY host_key, name
    `).all();
    
    db.close();
    
    const cookiesByDomain = {};
    const allCookies = {};
    
    cookies.forEach((cookie) => {
      const domain = cookie.domain;
      if (!cookiesByDomain[domain]) {
        cookiesByDomain[domain] = [];
      }
      
      const cookieData = {
        name: cookie.name,
        value: cookie.value,
        domain: cookie.domain,
        path: cookie.path,
        expires: cookie.expires_utc ? new Date((cookie.expires_utc / 1000000) - 11644473600000).toISOString() : null,
        secure: cookie.is_secure === 1,
        httpOnly: cookie.is_httponly === 1,
        sameSite: cookie.samesite,
        createdAt: cookie.creation_utc ? new Date((cookie.creation_utc / 1000000) - 11644473600000).toISOString() : null,
        lastAccessed: cookie.last_access_utc ? new Date((cookie.last_access_utc / 1000000) - 11644473600000).toISOString() : null,
      };
      
      cookiesByDomain[domain].push(cookieData);
      allCookies[`${domain}::${cookie.name}`] = cookieData;
    });
    
    return {
      cookiesByDomain,
      allCookies,
      totalCookies: cookies.length,
      totalDomains: Object.keys(cookiesByDomain).length,
    };
  } finally {
    try {
      fs.unlinkSync(tempDbPath);
    } catch (e) {
    }
  }
}

export { getAllCookiesFromChromeDatabase };

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const result = getAllCookiesFromChromeDatabase();
    const projectRoot = path.resolve(__dirname, '../..');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `all-cookies-${timestamp}.json`;
    const filepath = path.join(projectRoot, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(result, null, 2), 'utf8');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

