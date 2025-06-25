import type { AuthResponse } from './AuthResponse';
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: AuthResponse['role'];
}
