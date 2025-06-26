import { axiosInstance } from './axiosInstance';
import type { RegisterClienteRequest } from '../interfaces/auth/RegisterClienteRequest';
import type { RegisterProveedorRequest } from '../interfaces/auth/RegisterProveedorRequest';
import type { AuthResponse } from '../interfaces/auth/AuthResponse';

export interface LoginReq {
  email: string;
  password: string;
}


export async function login(req: LoginReq): Promise<AuthResponse> {
  const { data } = await axiosInstance.post<AuthResponse>('/auth/login', req);
  return data;
}

export async function registerCliente(r: RegisterClienteRequest): Promise<AuthResponse> {
  const { data } = await axiosInstance.post<AuthResponse>('/auth/register/cliente', r);
  return data;
}

export async function registerProveedor(r: RegisterProveedorRequest): Promise<AuthResponse> {
  const { data } = await axiosInstance.post<AuthResponse>('/auth/register/proveedor', r);
  return data;
}
