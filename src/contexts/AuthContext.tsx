import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
  register: (d: { name: string; email: string; password: string; role: AuthState['role'] }) => Promise<void>;
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
  const navigate = useNavigate();
  const [auth, setAuth] = useStorageState<AuthState | null>('auth', null);

  async function login(cred: { email: string; password: string }) {
    const data = await authSvc.login(cred);
    setAuth(data);
    saveAuth(data);
  }

  async function register(data: { name: string; email: string; password: string; role: AuthState['role'] }) {
    const resp = data.role === 'CLIENTE' ? await authSvc.registerCliente(data) : await authSvc.registerProveedor(data);
    setAuth(resp);
    saveAuth(resp);
  }

  function logout() {
    clearAuth();
    setAuth(null);
    navigate('/login');
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
