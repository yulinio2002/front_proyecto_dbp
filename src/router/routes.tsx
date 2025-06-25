import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from '../App';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ClientServicesPage from '../pages/ClientServicesPage';
import ProviderServicesPage from '../pages/ProviderServicesPage';
import ClientReservationsPage from '../pages/ClientReservationsPage';
import ProviderReservationsPage from '../pages/ProviderReservationsPage';
import AllReservationsPage from '../pages/AllReservationsPage';
import ServiceReviewsPage from '../pages/ServiceReviewsPage';
import { ProtectedRoute } from './ProtectedRoute';
import NotFoundPage from '../pages/NotFoundPage';

const clienteRoutes: RouteObject[] = [
  { path: '/cliente/servicios', element: <ClientServicesPage /> },
  { path: '/cliente/reservas', element: <ClientReservationsPage /> },
];

const proveedorRoutes: RouteObject[] = [
  { path: '/proveedor/servicios', element: <ProviderServicesPage /> },
  { path: '/proveedor/reservas', element: <ProviderReservationsPage /> },
];

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    element: <App />,
    children: [
      {
        element: <ProtectedRoute allowedRoles={['CLIENTE']} />,
        children: clienteRoutes,
      },
      {
        element: <ProtectedRoute allowedRoles={['PROVEEDOR']} />,
        children: proveedorRoutes,
      },
      { path: '/admin/reservas', element: <AllReservationsPage /> },
      { path: '/servicios/:servicioId/resenas', element: <ServiceReviewsPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);
