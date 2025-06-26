import { axiosInstance } from './axiosInstance';

export interface Resena {
  id: number;
  servicioId: number;
  clienteId: number;
  calificacion: number;
  comentario: string;
  fecha: string;
}

export interface CreateResenaReq {
  servicioId: number;
  clienteId: number;
  calificacion: number;
  comentario: string;
  fecha: string;
}

export async function createResena(body: CreateResenaReq): Promise<Resena> {
  const { data } = await axiosInstance.post<Resena>('/api/resenas', body);
  return data;
}

export async function getResenas(servicioId: number): Promise<Resena[]> {
  const { data } = await axiosInstance.get<Resena[]>(
    `/api/servicios/${servicioId}/resenas`,
  );
  return data;
}
