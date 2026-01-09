import fs from 'fs';
import path from 'path';
import os from 'os';

const getCookieDatabasePath = () => {
  const platform = process.platform;
  const homeDir = os.homedir();
  
  if (platform === 'darwin') {
    const chromePath = path.join(homeDir, 'Library', 'Application Support', 'Google', 'Chrome', 'Default', 'Cookies');
    const edgePath = path.join(homeDir, 'Library', 'Application Support', 'Microsoft Edge', 'Default', 'Cookies');
    const safariPath = path.join(homeDir, 'Library', 'Cookies', 'Cookies.binarycookies');
    
    if (fs.existsSync(chromePath)) return { path: chromePath, browser: 'Chrome' };
    if (fs.existsSync(edgePath)) return { path: edgePath, browser: 'Edge' };
    if (fs.existsSync(safariPath)) return { path: safariPath, browser: 'Safari' };
    
    return null;
  } else if (platform === 'win32') {
    const chromePath = path.join(homeDir, 'AppData', 'Local', 'Google', 'Chrome', 'User Data', 'Default', 'Cookies');
    const edgePath = path.join(homeDir, 'AppData', 'Local', 'Microsoft', 'Edge', 'User Data', 'Default', 'Cookies');
    
    if (fs.existsSync(chromePath)) return { path: chromePath, browser: 'Chrome' };
    if (fs.existsSync(edgePath)) return { path: edgePath, browser: 'Edge' };
    
    return null;
  } else if (platform === 'linux') {
    const chromePath = path.join(homeDir, '.config', 'google-chrome', 'Default', 'Cookies');
    const edgePath = path.join(homeDir, '.config', 'microsoft-edge', 'Default', 'Cookies');
    
    if (fs.existsSync(chromePath)) return { path: chromePath, browser: 'Chrome' };
    if (fs.existsSync(edgePath)) return { path: edgePath, browser: 'Edge' };
    
    return null;
  }
  
  return null;
};

export { getCookieDatabasePath };

