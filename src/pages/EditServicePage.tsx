import { FormEvent, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { updateServicio, Servicio } from '../services/servicios';
import { getServiciosProveedor } from '../services/proveedores';
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
  const [activo, setActivo] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!servicioId) return;

    const state = location.state as Servicio | undefined;
    if (state) {
      setNombre(state.nombre);
      setDescripcion(state.descripcion);
      setPrecio(String(state.precio));
      setCategoria(state.categoria);
      setActivo(state.activo);
      setLoading(false);
      return;
    }

    if (userId) {
      getServiciosProveedor(userId).then(list => {
        const service = list.find(s => s.id === Number(servicioId));
        if (service) {
          setNombre(service.nombre);
          setDescripcion(service.descripcion);
          setPrecio(String(service.precio));
          setCategoria(service.categoria);
          setActivo(service.activo);
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
      activo,
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
          <label className="flex gap-2 items-center">
            <span>Activo</span>
            <input
              type="checkbox"
              checked={activo}
              onChange={e => setActivo(e.target.checked)}
            />
          </label>
          <Button type="submit">Guardar</Button>
        </>
      )}
    </form>
  );
}
