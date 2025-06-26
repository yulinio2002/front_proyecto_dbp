import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProviderDashboardPage() {
  useAuth();
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Panel del Proveedor</h1>
      <nav className="space-x-4">
        <Link to="/proveedor/servicios" className="underline text-blue-600">
          Mis Servicios
        </Link>
        <Link to="/proveedor/reservas" className="underline text-blue-600">
          Reservas
        </Link>
      </nav>
    </div>
  );
}
