import { FormEvent, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateServicio, getServicio } from '../services/servicios';
import Input from '../components/Input';
import Button from '../components/Button';

export default function EditServicePage() {
  const { servicioId } = useParams();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!servicioId) return;
    getServicio(Number(servicioId)).then(s => {
      setNombre(s.nombre);
      setDescripcion(s.descripcion);
      setPrecio(String(s.precio));
      setCategoria(s.categoria);
      setLoading(false);
    });
  }, [servicioId]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!servicioId) return;
    await updateServicio(Number(servicioId), {
      nombre,
      descripcion,
      precio: Number(precio),
      categoria,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2">
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <Input label="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
          <Input label="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
          <Input label="Precio" value={precio} onChange={e => setPrecio(e.target.value)} />
          <Input label="Categoría" value={categoria} onChange={e => setCategoria(e.target.value)} />
          <Button type="submit">Guardar</Button>
        </>
      )}
    </form>
  );
}
