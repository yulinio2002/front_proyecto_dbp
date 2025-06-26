import { FormEvent, useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createReserva } from '../services/reservas';
import { searchServicios, Servicio } from '../services/servicios';
import Input from '../components/Input';
import Button from '../components/Button';

export default function CreateReservationPage() {
  const { userId } = useAuth();
  const [servicioId, setServicioId] = useState(0);
  const [fecha, setFecha] = useState('');
  const [direccion, setDireccion] = useState('');
  const [services, setServices] = useState<Servicio[]>([]);

  useEffect(() => {
    searchServicios({}).then(setServices);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!userId) return;
    await createReserva(userId, { fechaReserva: fecha, direccion, servicioId });
    setFecha('');
    setDireccion('');
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2">
      <label className="flex flex-col gap-1">
        <span>Servicio</span>
        <select
          value={servicioId}
          onChange={e => setServicioId(Number(e.target.value))}
          className="border p-2 rounded"
        >
          <option value="0">Seleccione</option>
          {services.map(s => (
            <option key={s.id} value={s.id}>
              {s.nombre}
            </option>
          ))}
        </select>
      </label>
      <Input label="Fecha" type="datetime-local" value={fecha} onChange={e => setFecha(e.target.value)} />
      <Input label="Dirección" value={direccion} onChange={e => setDireccion(e.target.value)} />
      <Button type="submit">Reservar</Button>
    </form>
  );
}
