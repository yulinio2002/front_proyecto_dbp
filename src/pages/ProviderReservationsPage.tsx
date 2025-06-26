import { useEffect, useState } from 'react';
import {
  getProveedorReservas,
  Reserva,
  acceptReserva,
  completeReserva,
} from '../services/reservas';
import { useAuth } from '../contexts/AuthContext';
import ReservationCard from '../components/ReservationCard';

export default function ProviderReservationsPage() {
  const { userId } = useAuth();
  const [list, setList] = useState<Reserva[]>([]);

  useEffect(() => {
    if (userId) {
      getProveedorReservas(userId).then(setList);
    }
  }, [userId]);

  return (
    <div className="p-4 space-y-2">
      {list.map(r => (
        <div key={r.id} className="space-y-2">
          <ReservationCard reserva={r} />
          <div className="flex gap-2">
            {r.estado === 'PENDIENTE' && (
              <button
                onClick={async () => {
                  const updated = await acceptReserva(r.id);
                  setList(list.map(it => (it.id === r.id ? updated : it)));
                }}
                className="text-blue-600 underline"
              >
                Aceptar
              </button>
            )}
            {r.estado === 'ACEPTADA' && (
              <button
                onClick={async () => {
                  const updated = await completeReserva(r.id);
                  setList(list.map(it => (it.id === r.id ? updated : it)));
                }}
                className="text-blue-600 underline"
              >
                Completar
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
