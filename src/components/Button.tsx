import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export default function Button({ variant = 'primary', ...rest }: Props) {
  const base = 'px-4 py-2 rounded';
  const cls = variant === 'primary' ? `${base} bg-blue-600 text-white` : `${base} bg-gray-200`;
  return <button className={cls} {...rest} />;
}
