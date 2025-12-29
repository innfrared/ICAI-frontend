import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getCookie, setCookie, removeCookie } from '../utils/cookies';
import { decodeJWT } from '../utils/jwt';
import { getUserProfile, refreshToken, type User } from '../services/auth/auth';
import type { ApiError } from '../services/api/client';

export type AuthStatus = 'loading' | 'authenticated' | 'anonymous';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  status: AuthStatus;
  login: (user: User, accessToken: string, refreshToken?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    // Check for stored authentication on mount
    const initializeAuth = async () => {
      setStatus('loading');
      const accessToken = getCookie('accessToken');
      const storedUser = getCookie('user');

      if (accessToken) {
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setIsAuthenticated(true);
            setStatus('authenticated');
            
            getUserProfile(accessToken)
              .then((freshUserData) => {
                setUser(freshUserData);
                setCookie('user', JSON.stringify(freshUserData), 7);
              })
              .catch((err) => {
                const apiError = err as ApiError;
                // If token expired (401), try to refresh it
                if (apiError.status === 401) {
                  handleTokenExpiration();
                }
              });
          } catch (error) {
            try {
              const userData = await getUserProfile(accessToken);
              setUser(userData);
              setIsAuthenticated(true);
              setStatus('authenticated');
              setCookie('user', JSON.stringify(userData), 7);
            } catch (profileError) {
              const apiError = profileError as ApiError;
              if (apiError.status === 401) {
                await handleTokenExpiration();
                return;
              }
              
              const decodedToken = decodeJWT(accessToken);
              const userId = decodedToken?.user_id ? parseInt(decodedToken.user_id, 10) : 0;
              
              if (userId > 0) {
                const userData: User = {
                  id: userId,
                  email: '',
                };
                setUser(userData);
                setIsAuthenticated(true);
                setStatus('authenticated');
                setCookie('user', JSON.stringify(userData), 7);
              } else {
                // Clear invalid data
                removeCookie('user');
                removeCookie('accessToken');
                removeCookie('refreshToken');
                setStatus('anonymous');
              }
            }
          }
        } else {
          // Have token but no user data - try to fetch from backend
          try {
            const userData = await getUserProfile(accessToken);
            setUser(userData);
            setIsAuthenticated(true);
            setStatus('authenticated');
            setCookie('user', JSON.stringify(userData), 7);
          } catch (profileError) {
            const apiError = profileError as ApiError;
            if (apiError.status === 401) {
              await handleTokenExpiration();
              return;
            }
            
            const decodedToken = decodeJWT(accessToken);
            const userId = decodedToken?.user_id ? parseInt(decodedToken.user_id, 10) : 0;
            
            if (userId > 0) {
              const userData: User = {
                id: userId,
                email: '',
              };
              setUser(userData);
              setIsAuthenticated(true);
              setStatus('authenticated');
              setCookie('user', JSON.stringify(userData), 7);
            } else {
              // Token might be invalid, clear it
              removeCookie('accessToken');
              removeCookie('refreshToken');
              setStatus('anonymous');
            }
          }
        }
      } else {
        setStatus('anonymous');
      }
    };

    initializeAuth();
  }, []);

  const handleTokenExpiration = async (): Promise<void> => {
    const refreshTokenValue = getCookie('refreshToken');
    
    if (!refreshTokenValue) {
      logout();
      return;
    }

    try {
      const response = await refreshToken(refreshTokenValue);
      
      if (response.access) {
        const newAccessToken = response.access;
        setCookie('accessToken', newAccessToken, 7);
        if (response.refresh) {
          setCookie('refreshToken', response.refresh, 30);
        }
        
        try {
          const userData = await getUserProfile(newAccessToken);
          setUser(userData);
          setIsAuthenticated(true);
          setStatus('authenticated');
          setCookie('user', JSON.stringify(userData), 7);
        } catch (profileError) {
          logout();
        }
      } else {
        logout();
      }
    } catch (refreshError) {
      console.error('Token refresh failed:', refreshError);
      logout();
    }
  };

  const login = (userData: User, accessToken: string, refreshToken?: string): void => {
    setCookie('accessToken', accessToken, 7);
    if (refreshToken) {
      setCookie('refreshToken', refreshToken, 30);
    }
    setCookie('user', JSON.stringify(userData), 7);
    setUser(userData);
    setIsAuthenticated(true);
    setStatus('authenticated');
  };

  const logout = (): void => {
    removeCookie('accessToken');
    removeCookie('refreshToken');
    removeCookie('user');
    setUser(null);
    setIsAuthenticated(false);
    setStatus('anonymous');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, status, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

