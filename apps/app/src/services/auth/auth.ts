import { getCookie } from '../../utils/cookies';
import type { ApiError } from '../api/client';
import type {
  LoginRequest,
  RegisterRequest,
  User,
  AuthResponse,
  UpdateUserProfileRequest,
} from './auth.types';

export type {
  LoginRequest,
  RegisterRequest,
  User,
  AuthResponse,
  UpdateUserProfileRequest,
} from './auth.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const handleResponse = async (response: Response): Promise<AuthResponse> => {
  const data = await response.json();

  if (!response.ok) {
    const error: ApiError = {
      message: data.message || data.detail || 'An error occurred',
      errors: data.errors || {},
    };
    throw error;
  }

  return data;
};

export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  return handleResponse(response);
};

export const register = async (userData: RegisterRequest): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  return handleResponse(response);
};

/**
 * Fetches the current user's profile from the backend.
 * 
 * Endpoint: GET /api/user/
 * 
 * Returns full user data including:
 * - id, email, first_name, last_name
 * - role, level, tech_stack
 */
export const getUserProfile = async (accessToken?: string): Promise<User> => {
  const token = accessToken || getCookie('accessToken');
  
  if (!token) {
    throw new Error('No access token available');
  }

  const response = await fetch(`${API_BASE_URL}/api/user/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('User profile endpoint not found. Please configure the endpoint in auth.ts');
    }
    const data = await response.json();
    const error: ApiError = {
      status: response.status,
      message: data.message || data.detail || 'Failed to fetch user profile',
      errors: data.errors || {},
    };
    throw error;
  }

  const data = await response.json();
  return data;
};

/**
 * Refreshes the access token using the refresh token.
 * 
 * Endpoint: POST /api/auth/token/refresh/
 * 
 * Returns new access and refresh tokens.
 */
export const refreshToken = async (refreshTokenValue: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshTokenValue }),
  });

  return handleResponse(response);
};

/**
 * Updates the current user's profile.
 * 
 * Endpoint: PUT /api/user/ or PATCH /api/user/
 * 
 * Updates user data including:
 * - first_name, last_name, email
 * - role, level, tech_stack
 */
export const updateUserProfile = async (
  userData: UpdateUserProfileRequest,
  accessToken?: string
): Promise<User> => {
  const token = accessToken || getCookie('accessToken');
  
  if (!token) {
    throw new Error('No access token available');
  }

  const response = await fetch(`${API_BASE_URL}/api/user/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || data.detail || 'Failed to update user profile');
  }

  const data = await response.json();
  return data;
};

