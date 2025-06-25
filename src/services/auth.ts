import { axiosInstance } from './axiosInstance';

export interface AuthResponse {
  userId: number;
  token: string;
  role: 'CLIENTE' | 'PROVEEDOR';
}

export interface LoginReq {
  email: string;
  password: string;
}

export interface RegisterReq {
  name: string;
  email: string;
  password: string;
  role: AuthResponse['role'];
}

export async function login(req: LoginReq): Promise<AuthResponse> {
  const { data } = await axiosInstance.post<AuthResponse>('/auth/login', req);
  return data;
}

export async function registerCliente(r: RegisterReq): Promise<AuthResponse> {
  const { data } = await axiosInstance.post<AuthResponse>('/auth/register/cliente', r);
  return data;
}

export async function registerProveedor(r: RegisterReq): Promise<AuthResponse> {
  const { data } = await axiosInstance.post<AuthResponse>('/auth/register/proveedor', r);
  return data;
}
