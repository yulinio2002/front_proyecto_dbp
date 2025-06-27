import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { searchServicios, Servicio } from '../services/servicios';

export default function ProviderDashboardPage() {
  const { userId } = useAuth();
  const [list, setList] = useState<Servicio[]>([]);

  useEffect(() => {
    if (userId) {
      searchServicios({ proveedorId: userId }).then(setList);
    }
  }, [userId]);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Panel del Proveedor</h1>
      <div>
        <Link to="/proveedor/servicios/nuevo" className="text-blue-600 underline">
          Agregar Servicio
        </Link>
      </div>
      <table className="min-w-full text-left border divide-y">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Descripción</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Horarios</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {list.map(s => (
            <tr key={s.id} className="divide-x">
              <td className="p-2">{s.nombre}</td>
              <td className="p-2">{s.descripcion}</td>
              <td className="p-2">${s.precio}</td>
              <td className="p-2">
                <Link
                  to={`/proveedor/servicios/${s.id}/horarios`}
                  className="text-blue-600 underline"
                >
                  Ver
                </Link>
              </td>
              <td className="p-2 space-x-2">
                <Link
                  to={`/proveedor/servicios/${s.id}/editar`}
                  className="text-blue-600 underline"
                >
                  Editar
                </Link>
                <Link
                  to={`/servicios/${s.id}/resenas`}
                  className="text-blue-600 underline"
                >
                  Reseñas
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
