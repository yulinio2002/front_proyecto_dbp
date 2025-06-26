export interface AuthResponse {
  id: number;
  token: string;
  role?: 'CLIENTE' | 'PROVEEDOR';
}
