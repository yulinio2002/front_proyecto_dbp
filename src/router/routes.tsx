import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import App from '../App';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ClientServicesPage from '../pages/ClientServicesPage';
import ProviderServicesPage from '../pages/ProviderServicesPage';
import ClientReservationsPage from '../pages/ClientReservationsPage';
import ProviderReservationsPage from '../pages/ProviderReservationsPage';
import AllReservationsPage from '../pages/AllReservationsPage';
import ServiceReviewsPage from '../pages/ServiceReviewsPage';
import ClientDashboardPage from '../pages/ClientDashboardPage';
import ProviderDashboardPage from '../pages/ProviderDashboardPage';
import CreateReservationPage from '../pages/CreateReservationPage';
import SearchServicesPage from '../pages/SearchServicesPage';
import CreateReviewPage from '../pages/CreateReviewPage';
import CreateServicePage from '../pages/CreateServicePage';
import EditServicePage from '../pages/EditServicePage';
import ServiceSchedulePage from '../pages/ServiceSchedulePage';
import ProviderReviewsPage from '../pages/ProviderReviewsPage';
import { ProtectedRoute } from './ProtectedRoute';
import NotFoundPage from '../pages/NotFoundPage';

const clienteRoutes: RouteObject[] = [
  { path: '/cliente/dashboard', element: <ClientDashboardPage /> },
  { path: '/cliente/servicios', element: <ClientServicesPage /> },
  { path: '/cliente/reservas', element: <ClientReservationsPage /> },
  { path: '/cliente/reservar', element: <CreateReservationPage /> },
  { path: '/cliente/buscar', element: <SearchServicesPage /> },
  { path: '/cliente/resenas/nuevo/:servicioId', element: <CreateReviewPage /> },
];

const proveedorRoutes: RouteObject[] = [
  { path: '/proveedor/dashboard', element: <ProviderDashboardPage /> },
  { path: '/proveedor/servicios', element: <ProviderServicesPage /> },
  { path: '/proveedor/servicios/nuevo', element: <CreateServicePage /> },
  { path: '/proveedor/servicios/:servicioId/editar', element: <EditServicePage /> },
  { path: '/proveedor/servicios/:servicioId/horarios', element: <ServiceSchedulePage /> },
  { path: '/proveedor/reservas', element: <ProviderReservationsPage /> },
  { path: '/proveedor/resenas', element: <ProviderReviewsPage /> },
];

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
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
