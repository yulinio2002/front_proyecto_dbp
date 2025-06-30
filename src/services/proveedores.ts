import { axiosInstance } from './axiosInstance';
import type { Servicio } from './servicios';

export interface CreateServicioReq {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  activo: boolean;
}

export async function addServicio(
  proveedorId: number,
  body: CreateServicioReq,
): Promise<Servicio> {
  const { data } = await axiosInstance.post<Servicio>(
    `/api/proveedores/${proveedorId}/servicios`,
    body,
  );
  return data;
}

export async function getServiciosProveedor(
  proveedorId: number,
): Promise<Servicio[]> {
  const { data } = await axiosInstance.get<Servicio[]>(
    `/api/servicios/${proveedorId}/servicios`,
  );
  return data;
}
