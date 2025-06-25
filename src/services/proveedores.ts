import { axiosInstance } from './axiosInstance';
import type { Servicio } from './servicios';

export interface CreateServicioReq {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
}

export async function addServicio(proveedorId: number, body: CreateServicioReq): Promise<Servicio> {
  const { data } = await axiosInstance.post<Servicio>(`/proveedores/${proveedorId}/servicios`, body);
  return data;
}
