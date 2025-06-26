import { useEffect, useState } from 'react';
import { searchServicios, Servicio } from '../services/servicios';
import ServiceCard from '../components/ServiceCard';

export default function ClientServicesPage() {
  const [list, setList] = useState<Servicio[]>([]);

  useEffect(() => {
    searchServicios({}).then(setList);
  }, []);

  return (
    <div className="p-4 space-y-2">
      {list.map(s => (
        <ServiceCard key={s.id} servicio={s} />
      ))}
    </div>
  );
}
