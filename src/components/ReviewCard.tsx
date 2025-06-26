import { Resena } from '../services/resenas';

export default function ReviewCard({ resena }: { resena: Resena }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <p className="font-semibold">Calificación: {resena.calificacion}</p>
      <p>{resena.comentario}</p>
    </div>
  );
}
