import { Servicio } from '../services/servicios';

export default function ServiceCard({ servicio }: { servicio: Servicio }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-bold">{servicio.nombre}</h3>
      <p>{servicio.descripcion}</p>
      <span className="text-sm">${servicio.precio}</span>
    </div>
  );
}
