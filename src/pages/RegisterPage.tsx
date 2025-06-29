import { FormEvent, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

export default function RegisterPage() {
  const { register } = useAuth();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [role, setRole] = useState<'CLIENTE' | 'PROVEEDOR'>('CLIENTE');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (role === 'CLIENTE') {
      await register({ nombre, apellido, email, telefono, password, role });
    } else {
      await register({ nombre, email, password, descripcion, telefono, role });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <Input label="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      {role === 'CLIENTE' && (
        <Input label="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} />
      )}
      <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <Input label="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} />
      {role === 'PROVEEDOR' && (
        <Input label="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
      )}
      <label className="flex gap-2 items-center">
        <span>Rol</span>
        <select value={role} onChange={e => setRole(e.target.value as 'CLIENTE' | 'PROVEEDOR')} className="border p-2 rounded">
          <option value="CLIENTE">Cliente</option>
          <option value="PROVEEDOR">Proveedor</option>
        </select>
      </label>
      <Button type="submit">Register</Button>
    </form>
  );
}
