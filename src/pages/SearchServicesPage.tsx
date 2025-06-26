import { useEffect, useState, FormEvent } from 'react';
import { searchServicios, Servicio } from '../services/servicios';
import ServiceCard from '../components/ServiceCard';
import Input from '../components/Input';
import Button from '../components/Button';

export default function SearchServicesPage() {
  const [list, setList] = useState<Servicio[]>([]);
  const [categoria, setCategoria] = useState('');
  const [direccion, setDireccion] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [calificacionMin, setCalificacionMin] = useState('');

  function fetchData() {
    searchServicios({
      categoria: categoria || undefined,
      direccion: direccion || undefined,
      precioMin: precioMin ? Number(precioMin) : undefined,
      precioMax: precioMax ? Number(precioMax) : undefined,
      calificacionMin: calificacionMin ? Number(calificacionMin) : undefined,
    }).then(setList);
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    fetchData();
  }

  return (
    <div className="p-4 space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
        <Input label="Categoria" value={categoria} onChange={e => setCategoria(e.target.value)} />
        <Input label="Dirección" value={direccion} onChange={e => setDireccion(e.target.value)} />
        <Input label="Precio Min" value={precioMin} onChange={e => setPrecioMin(e.target.value)} />
        <Input label="Precio Max" value={precioMax} onChange={e => setPrecioMax(e.target.value)} />
        <Input label="Calificación Min" value={calificacionMin} onChange={e => setCalificacionMin(e.target.value)} />
        <Button type="submit">Buscar</Button>
      </form>
      <div className="space-y-2">
        {list.map(s => (
          <ServiceCard key={s.id} servicio={s} />
        ))}
      </div>
    </div>
  );
}
