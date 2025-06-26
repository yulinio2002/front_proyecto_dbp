export interface AuthResponse {
  userId: number;
  token: string;
  role: 'CLIENTE' | 'PROVEEDOR';
}
