export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
}

export interface UserInfoResponse {
  email: string;
  role: string;
}

export interface JwtPayload {
  sub?: string;
  exp?: number;
  iat?: number;
  roles?: string[];
}

export type AuthSessionStatus = 'anonymous' | 'authenticated' | 'expired';
