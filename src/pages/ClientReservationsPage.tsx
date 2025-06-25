import { useEffect, useState } from 'react';
import { getClienteReservas, Reserva } from '../services/reservas';
import { useAuth } from '../contexts/AuthContext';
import ReservationCard from '../components/ReservationCard';

export default function ClientReservationsPage() {
  const { id } = useAuth();
  const [list, setList] = useState<Reserva[]>([]);

  useEffect(() => {
    if (id) {
      getClienteReservas(id).then(setList);
    }
  }, [id]);

  return (
    <div className="p-4 space-y-2">
      {list.map(r => (
        <ReservationCard key={r.id} reserva={r} />
      ))}
    </div>
  );
}
