import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createResena } from '../services/resenas';
import Input from '../components/Input';
import Button from '../components/Button';

export default function CreateReviewPage() {
  const { servicioId } = useParams();
  const { userId } = useAuth();
  const [comentario, setComentario] = useState('');
  const [calificacion, setCalificacion] = useState(5);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!servicioId || !userId) return;
    await createResena({
      servicioId: Number(servicioId),
      clienteId: userId,
      comentario,
      calificacion,
      fecha: new Date().toISOString(),
    });
    setComentario('');
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2">
      <Input label="Comentario" value={comentario} onChange={e => setComentario(e.target.value)} />
      <Input label="Calificación" type="number" value={calificacion} onChange={e => setCalificacion(Number(e.target.value))} />
      <Button type="submit">Enviar</Button>
    </form>
  );
}
