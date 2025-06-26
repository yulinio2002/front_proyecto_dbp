import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute({ allowedRoles }: { allowedRoles: Array<'CLIENTE' | 'PROVEEDOR'> }) {
  const auth = useAuth();
  if (!auth.token || !auth.role || !allowedRoles.includes(auth.role)) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
