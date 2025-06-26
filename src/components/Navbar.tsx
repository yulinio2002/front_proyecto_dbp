import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { role, username, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="font-bold">Servicios</div>
      <div className="space-x-4 flex items-center">
        {role === 'PROVEEDOR' && username && (
          <span className="mr-4">Proveedor: {username}</span>
        )}
        {role === 'CLIENTE' && username && (
          <span className="mr-4">{username}</span>
        )}
        {role === 'CLIENTE' && (
          <>
            <Link to="/cliente/dashboard" className="hover:underline">
              Inicio
            </Link>
            <Link to="/cliente/buscar" className="hover:underline">
              Buscar
            </Link>
            <Link to="/cliente/reservas" className="hover:underline">
              Reservas
            </Link>
          </>
        )}
        {role === 'PROVEEDOR' && (
          <>
            <Link to="/proveedor/dashboard" className="hover:underline">
              Inicio
            </Link>
            <Link to="/proveedor/reservas" className="hover:underline">
              Mis reservas
            </Link>
          </>
        )}
        <button onClick={logout} className="hover:underline">
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
