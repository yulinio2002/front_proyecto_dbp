import { useEffect, useState } from 'react';
import {
  getClienteReservas,
  Reserva,
  cancelReserva,
} from '../services/reservas';
import { useAuth } from '../contexts/AuthContext';
import ReservationCard from '../components/ReservationCard';

export default function ClientReservationsPage() {
  const { userId } = useAuth();
  const [list, setList] = useState<Reserva[]>([]);

  useEffect(() => {
    if (userId) {
      getClienteReservas(userId).then(setList);
    }
  }, [userId]);

  return (
    <div className="p-4 space-y-2">
      {list.map(r => (
        <div key={r.id} className="space-y-2">
          <ReservationCard reserva={r} />
          {r.estado !== 'CANCELADA' && r.estado !== 'COMPLETADA' && (
            <button
              onClick={async () => {
                if (!userId) return;
                const updated = await cancelReserva(userId, r.id);
                setList(list.map(it => (it.id === r.id ? updated : it)));
              }}
              className="text-blue-600 underline"
            >
              Cancelar
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
