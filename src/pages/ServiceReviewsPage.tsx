import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getResenas, createResena, Resena } from '../services/resenas';
import ReviewCard from '../components/ReviewCard';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

export default function ServiceReviewsPage() {
  const { servicioId } = useParams();
  const { userId } = useAuth();
  const [list, setList] = useState<Resena[]>([]);
  const [comentario, setComentario] = useState('');
  const [calificacion, setCalificacion] = useState(5);

  useEffect(() => {
    if (servicioId) getResenas(Number(servicioId)).then(setList);
  }, [servicioId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!servicioId || !userId) return;
    const res = await createResena({
      servicioId: Number(servicioId),
      clienteId: userId,
      comentario,
      calificacion,
      fecha: new Date().toISOString(),
    });
    setList([...list, res]);
    setComentario('');
  }

  const avg =
    list.length > 0
      ? (
          list.reduce((sum, r) => sum + r.calificacion, 0) / list.length
        ).toFixed(1)
      : 'No hay calificaciones';

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Calificación promedio: {avg}</h2>
      <div className="space-y-2">
        {list.map(r => (
          <ReviewCard key={r.id} resena={r} />
        ))}
      </div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          label="Comentario"
          value={comentario}
          onChange={e => setComentario(e.target.value)}
        />
        <Input
          label="Calificación"
          type="number"
          value={calificacion}
          onChange={e => setCalificacion(Number(e.target.value))}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </div>
  );
}
