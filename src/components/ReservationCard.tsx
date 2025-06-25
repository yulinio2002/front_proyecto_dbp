import { Reserva } from '../services/reservas';

export default function ReservationCard({ reserva }: { reserva: Reserva }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <p>Fecha: {reserva.fechaReserva}</p>
      <p>Dirección: {reserva.direccion}</p>
      <p>Estado: {reserva.estado}</p>
    </div>
  );
}
