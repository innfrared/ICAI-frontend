import { getCookie, setCookie, removeCookie } from './cookies';
import { refreshToken } from '../services/auth/auth';
import type { ApiError } from '../services/api/client';

/**
 * Handles 401 Unauthorized errors by attempting to refresh the token.
 * If refresh fails, clears auth and redirects to login.
 */
export const handle401Error = async (error: ApiError): Promise<boolean> => {
  if (error.status !== 401) {
    return false;
  }

  const refreshTokenValue = getCookie('refreshToken');
  
  if (!refreshTokenValue) {
    // No refresh token, clear auth and redirect
    clearAuthAndRedirect();
    return true;
  }

  try {
    // Attempt to refresh the token
    const response = await refreshToken(refreshTokenValue);
    
    if (response.access) {
      // Save new tokens
      setCookie('accessToken', response.access, 7);
      if (response.refresh) {
        setCookie('refreshToken', response.refresh, 30);
      }
      // Return true to indicate token was refreshed, caller should retry
      return true;
    }
  } catch (refreshError) {
    // Refresh failed, clear auth and redirect
    console.error('Token refresh failed:', refreshError);
    clearAuthAndRedirect();
    return true;
  }

  return false;
};

const clearAuthAndRedirect = (): void => {
  removeCookie('accessToken');
  removeCookie('refreshToken');
  removeCookie('user');
  
  // Redirect to login with current location
  const currentPath = window.location.pathname;
  window.location.href = `/login?from=${encodeURIComponent(currentPath)}`;
};

