import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchServicios, Servicio } from '../services/servicios';
import ServiceCard from '../components/ServiceCard';
import { useAuth } from '../contexts/AuthContext';

export default function ProviderServicesPage() {
  const { userId } = useAuth();
  const [list, setList] = useState<Servicio[]>([]);

  useEffect(() => {
    searchServicios({ proveedorId: userId }).then(setList);
  }, [userId]);

  return (
    <div className="p-4 space-y-4">
      <div>
        <Link
          to="/proveedor/servicios/nuevo"
          className="text-blue-600 underline"
        >
          Agregar Servicio
        </Link>
      </div>
      {list.map(s => (
        <div key={s.id} className="space-y-2">
          <ServiceCard servicio={s} />
          <div className="flex gap-2">
            <Link
              to={`/proveedor/servicios/${s.id}/editar`}
              className="text-blue-600 underline"
            >
              Editar
            </Link>
            <Link
              to={`/proveedor/servicios/${s.id}/horarios`}
              className="text-blue-600 underline"
            >
              Horarios
            </Link>
            <Link
              to={`/servicios/${s.id}/resenas`}
              className="text-blue-600 underline"
            >
              Reseñas
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
