import { useEffect, useState } from 'react';
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
    <div className="p-4 space-y-2">
      {list.map(s => (
        <ServiceCard key={s.id} servicio={s} />
      ))}
    </div>
  );
}
