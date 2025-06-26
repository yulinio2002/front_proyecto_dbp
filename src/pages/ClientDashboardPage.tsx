import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { getClienteReservas } from '../services/reservas';

export default function ClientDashboardPage() {
  const { userId } = useAuth();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (userId) {
      getClienteReservas(userId).then(list => {
        setActive(list.filter(r => r.estado !== 'CANCELADA').length);
      });
    }
  }, [userId]);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Bienvenido</h1>
      <p>Reservas activas: {active}</p>
      <nav className="space-x-4">
        <Link to="/cliente/servicios" className="underline text-blue-600">
          Buscar Servicios
        </Link>
        <Link to="/cliente/reservas" className="underline text-blue-600">
          Mis Reservas
        </Link>
      </nav>
    </div>
  );
}
