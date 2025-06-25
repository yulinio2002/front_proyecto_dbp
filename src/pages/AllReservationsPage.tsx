import { useEffect, useState } from 'react';
import { getAllReservas, Reserva } from '../services/reservas';
import ReservationCard from '../components/ReservationCard';

export default function AllReservationsPage() {
  const [list, setList] = useState<Reserva[]>([]);

  useEffect(() => {
    getAllReservas().then(setList);
  }, []);

  return (
    <div className="p-4 space-y-2">
      {list.map(r => (
        <ReservationCard key={r.id} reserva={r} />
      ))}
    </div>
  );
}
