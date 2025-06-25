import { axiosInstance } from './axiosInstance';
import type { CreateServicioReq } from './proveedores';

export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  proveedorId: number;
}

export interface SearchParams {
  categoria?: string;
  direccion?: string;
  precioMin?: number;
  precioMax?: number;
  calificacionMin?: number;
  page?: number;
  size?: number;
  proveedorId?: number;
}

export interface HorarioReq {
  dia: string;
  horaInicio: string;
  horaFin: string;
}

export async function searchServicios(p: SearchParams): Promise<Servicio[]> {
  const { data } = await axiosInstance.get<Servicio[]>('/servicios', { params: p });
  return data;
}

export async function updateServicio(id: number, body: Partial<CreateServicioReq>): Promise<Servicio> {
  const { data } = await axiosInstance.put<Servicio>(`/servicios/${id}`, body);
  return data;
}

export async function setHorarios(servicioId: number, horarios: HorarioReq[]): Promise<void> {
  await axiosInstance.post(`/servicios/${servicioId}/horarios`, horarios);
}
