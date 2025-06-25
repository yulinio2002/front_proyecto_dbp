import { axiosInstance } from './axiosInstance';

export async function procesarPago(reservaId: number): Promise<{ success: boolean }> {
  const { data } = await axiosInstance.post<{ success: boolean }>(`/pagos/${reservaId}`);
  return data;
}
