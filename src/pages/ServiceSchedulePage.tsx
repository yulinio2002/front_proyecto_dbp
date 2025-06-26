import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { setHorarios, HorarioReq } from '../services/servicios';
import Input from '../components/Input';
import Button from '../components/Button';

export default function ServiceSchedulePage() {
  const { servicioId } = useParams();
  const [horarios, setData] = useState<HorarioReq[]>([{ diaSemana: '', horaInicio: '', horaFin: '' }]);

  function handleChange(index: number, field: keyof HorarioReq, value: string) {
    setData(h => h.map((it, i) => (i === index ? { ...it, [field]: value } : it)));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!servicioId) return;
    await setHorarios(Number(servicioId), horarios);
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2">
      {horarios.map((h, idx) => (
        <div key={idx} className="flex gap-2">
          <Input label="Día" value={h.diaSemana} onChange={e => handleChange(idx, 'diaSemana', e.target.value)} />
          <Input label="Inicio" value={h.horaInicio} onChange={e => handleChange(idx, 'horaInicio', e.target.value)} />
          <Input label="Fin" value={h.horaFin} onChange={e => handleChange(idx, 'horaFin', e.target.value)} />
        </div>
      ))}
      <Button type="submit">Guardar</Button>
    </form>
  );
}
