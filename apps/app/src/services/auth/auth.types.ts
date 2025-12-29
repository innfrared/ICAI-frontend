// Auth API Types

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  level: string;
  tech_stack: string[];
  password: string;
}

export interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  level?: string;
  tech_stack?: string[];
}

export interface AuthResponse {
  access?: string;
  refresh?: string;
  user?: User;
  message?: string;
}

export interface UpdateUserProfileRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: string;
  level?: string;
  tech_stack?: string[];
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

