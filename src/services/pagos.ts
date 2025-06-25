import { axiosInstance } from './axiosInstance';

export interface PagoReq {
  monto: number;
  estado: string;
}

export async function procesarPago(
  reservaId: number,
  body: PagoReq,
): Promise<{ success: boolean }> {
  const { data } = await axiosInstance.post<{ success: boolean }>(
    `/api/pagos/${reservaId}`,
    body,
  );
  return data;
}
