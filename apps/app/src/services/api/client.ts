import { getCookie } from '../../utils/cookies';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export type ApiError = {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
};

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  accessToken?: string;
  body?: unknown;
  headers?: Record<string, string>;
};

const buildAuthHeader = (accessToken?: string): Record<string, string> => {
  const token = accessToken || getCookie('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export async function apiRequest<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const {
    method = 'GET',
    body,
    headers = {},
    accessToken,
  } = opts;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...buildAuthHeader(accessToken),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    const err: ApiError = {
      status: response.status,
      message: data?.message || data?.detail || 'Request failed',
      errors: data?.errors || {},
    };
    throw err;
  }

  return data as T;
}
