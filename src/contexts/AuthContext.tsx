import { createContext, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { router } from '../router/routes';
import { useStorageState } from '../hooks/useStorageState';
import { clearAuth, saveAuth } from '../utils/authHelpers';
import * as authSvc from '../services/auth';

export interface AuthState {
  userId: number;
  token: string;
  role: 'CLIENTE' | 'PROVEEDOR';
}

export interface AuthContextType extends Partial<AuthState> {
  login: (c: { email: string; password: string }) => Promise<void>;
  register: (
    d:
      | (import('../interfaces/auth/RegisterClienteRequest').RegisterClienteRequest & { role: 'CLIENTE' })
      | (import('../interfaces/auth/RegisterProveedorRequest').RegisterProveedorRequest & { role: 'PROVEEDOR' })
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('AuthProvider missing');
  return ctx;
}

export let externalLogout = () => {};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useStorageState<AuthState | null>('auth', null);

  interface JwtPayload {
    role: 'CLIENTE' | 'PROVEEDOR';
  }

  async function login(cred: { email: string; password: string }) {
    const resp = await authSvc.login(cred);
    const { role } = jwtDecode<JwtPayload>(resp.token);
    const authData = { userId: resp.id, token: resp.token, role } as AuthState;
    setAuth(authData);
    saveAuth(authData);
    router.navigate(role === 'CLIENTE' ? '/cliente/servicios' : '/proveedor/servicios');
  }

  async function register(
    data:
      | (import('../interfaces/auth/RegisterClienteRequest').RegisterClienteRequest & { role: 'CLIENTE' })
      | (import('../interfaces/auth/RegisterProveedorRequest').RegisterProveedorRequest & { role: 'PROVEEDOR' })
  ) {
    const resp =
      data.role === 'CLIENTE'
        ? await authSvc.registerCliente(data)
        : await authSvc.registerProveedor(data);
    const role = resp.role ?? jwtDecode<JwtPayload>(resp.token).role;
    const authData = { userId: resp.id, token: resp.token, role } as AuthState;
    setAuth(authData);
    saveAuth(authData);
    router.navigate(role === 'CLIENTE' ? '/cliente/servicios' : '/proveedor/servicios');
  }

  function logout() {
    clearAuth();
    setAuth(null);
    router.navigate('/login');
  }

  externalLogout = logout;

  const value: AuthContextType = {
    userId: auth?.userId,
    token: auth?.token,
    role: auth?.role,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
