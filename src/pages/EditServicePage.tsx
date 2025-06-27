import { FormEvent, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { updateServicio, searchServicios, Servicio } from '../services/servicios';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

export default function EditServicePage() {
  const { servicioId } = useParams();
  const location = useLocation();
  const { userId } = useAuth();

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!servicioId) return;

    const state = location.state as Servicio | undefined;
    if (state) {
      setNombre(state.nombre);
      setDescripcion(state.descripcion);
      setPrecio(String(state.precio));
      setCategoria(state.categoria);
      setLoading(false);
      return;
    }

    if (userId) {
      searchServicios({ proveedorId: userId }).then(list => {
        const service = list.find(s => s.id === Number(servicioId));
        if (service) {
          setNombre(service.nombre);
          setDescripcion(service.descripcion);
          setPrecio(String(service.precio));
          setCategoria(service.categoria);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [servicioId, location.state, userId]);

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
