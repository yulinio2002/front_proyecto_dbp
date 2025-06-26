import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, ...rest }: Props) {
  return (
    <label className="flex flex-col gap-1">
      <span>{label}</span>
      <input className="border p-2 rounded" {...rest} />
    </label>
  );
}
