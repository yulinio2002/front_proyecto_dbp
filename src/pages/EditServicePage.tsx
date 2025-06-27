import { FormEvent, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateServicio, getServicio, Servicio } from '../services/servicios';
import Input from '../components/Input';
import Button from '../components/Button';

export default function EditServicePage() {
  const { servicioId } = useParams();
  const [data, setData] = useState<Partial<Servicio>>({});

  useEffect(() => {
    if (!servicioId) return;
    getServicio(Number(servicioId)).then(setData);
  }, [servicioId]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!servicioId) return;
    await updateServicio(Number(servicioId), data);
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2">
      <Input label="Nombre" value={data.nombre || ''} onChange={e => setData({ ...data, nombre: e.target.value })} />
      <Input label="Descripción" value={data.descripcion || ''} onChange={e => setData({ ...data, descripcion: e.target.value })} />
      <Input label="Precio" value={data.precio?.toString() || ''} onChange={e => setData({ ...data, precio: Number(e.target.value) })} />
      <Input label="Categoría" value={data.categoria || ''} onChange={e => setData({ ...data, categoria: e.target.value })} />
      <Button type="submit">Guardar</Button>
    </form>
  );
}
