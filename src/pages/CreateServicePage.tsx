import { FormEvent, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { addServicio } from '../services/proveedores';
import Input from '../components/Input';
import Button from '../components/Button';

export default function CreateServicePage() {
  const { userId } = useAuth();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [activo, setActivo] = useState(true);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!userId) return;
    await addServicio(userId, {
      nombre,
      descripcion,
      precio: Number(precio),
      categoria,
      activo,
    });
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setCategoria('');
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2">
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
      <Button type="submit">Crear</Button>
    </form>
  );
}
