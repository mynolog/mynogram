import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../components/home/Home.tsx'
import Login from '../components/auth/Login.tsx'
import ProtectedRoute from './protectedRoute/ProtectedRoute.tsx'

export default function AppRouter() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: '/login',
      element: <Login />,
    },
  ])
  return <RouterProvider router={routes} />
}
