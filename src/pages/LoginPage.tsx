import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await login({ email, password });
  }

  return (
    <div className="flex flex-col justify-end min-h-screen p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-white shadow rounded">
        <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button type="submit">Login</Button>
      </form>
      <div className="text-center mt-4">
        <Link to="/register?role=CLIENTE" className="text-blue-600 underline mr-4">
          Registrarse como Cliente
        </Link>
        <Link to="/register?role=PROVEEDOR" className="text-blue-600 underline">
          Registrarse como Proveedor
        </Link>
      </div>
    </div>
  );
}
