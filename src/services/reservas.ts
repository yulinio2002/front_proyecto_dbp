import { axiosInstance } from './axiosInstance';

export interface Reserva {
  id: number;
  fechaReserva: string;
  direccion: string;
  estado: 'PENDIENTE' | 'ACEPTADA' | 'COMPLETADA' | 'CANCELADA';
  clienteId: number;
  servicioId: number;
}

export interface CreateReservaReq {
  fechaReserva: string;
  direccion: string;
  servicioId: number;
}

export async function createReserva(
  clienteId: number,
  body: CreateReservaReq,
): Promise<Reserva> {
  const { data } = await axiosInstance.post<Reserva>(
    `/api/clientes/${clienteId}/reservas`,
    body,
  );
  return data;
}

export async function cancelReserva(
  clienteId: number,
  reservaId: number,
): Promise<Reserva> {
  const { data } = await axiosInstance.patch<Reserva>(
    `/api/clientes/${clienteId}/reservas/${reservaId}/cancelar`,
  );
  return data;
}

export async function acceptReserva(reservaId: number): Promise<Reserva> {
  const { data } = await axiosInstance.patch<Reserva>(
    `/api/reservas/${reservaId}/aceptar`,
  );
  return data;
}

export async function completeReserva(reservaId: number): Promise<Reserva> {
  const { data } = await axiosInstance.patch<Reserva>(
    `/api/reservas/${reservaId}/completar`,
  );
  return data;
}

export async function getClienteReservas(clienteId: number): Promise<Reserva[]> {
  const { data } = await axiosInstance.get<Reserva[]>(
    `/api/clientes/${clienteId}/reservas`,
  );
  return data;
}

export async function getProveedorReservas(
  proveedorId: number,
): Promise<Reserva[]> {
  const { data } = await axiosInstance.get<Reserva[]>(
    `/api/proveedores/${proveedorId}/reservas`,
  );
  return data;
}

export async function getAllReservas(): Promise<Reserva[]> {
  const { data } = await axiosInstance.get<Reserva[]>('/api/reservas');
  return data;
}
