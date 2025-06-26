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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!userId) return;
    await addServicio(userId, {
      nombre,
      descripcion,
      precio: Number(precio),
      categoria,
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
      <Button type="submit">Crear</Button>
    </form>
  );
}
