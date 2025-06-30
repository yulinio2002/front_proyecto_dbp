import { axiosInstance } from './axiosInstance';
import type { CreateServicioReq } from './proveedores';

export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  proveedorId: number;
  activo: boolean;
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
  diaSemana: string;
  horaInicio: string;
  horaFin: string;
}

export type Horario = HorarioReq;

export async function getServicio(id: number): Promise<Servicio> {
  const { data } = await axiosInstance.get<Servicio>(`/api/servicios/${id}`);
  return data;
}

export async function searchServicios(p: SearchParams): Promise<Servicio[]> {
  const { data } = await axiosInstance.get<Servicio[]>('/api/servicios', {
    params: p,
  });
  return data;
}

export async function updateServicio(
  id: number,
  body: Partial<CreateServicioReq>,
): Promise<Servicio> {
  const { data } = await axiosInstance.put<Servicio>(`/api/servicios/${id}`, body);
  return data;
}

export async function changeEstado(
  servicioId: number,
  activo: boolean,
): Promise<void> {
  await axiosInstance.patch(
    `/api/servicios/${servicioId}/estado`,
    {},
    { params: { activo } },
  );
}

export async function setHorarios(
  servicioId: number,
  horarios: HorarioReq[],
): Promise<void> {
  await axiosInstance.post(`/api/servicios/${servicioId}/horarios`, horarios);
}

export async function getHorarios(servicioId: number): Promise<Horario[]> {
  const { data } = await axiosInstance.get<Horario[]>(
    `/api/servicios/${servicioId}/horarios`,
  );
  return data;
}
