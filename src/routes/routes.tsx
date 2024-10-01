import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../components/layout/Layout.tsx'
import Home from '../components/home/Home.tsx'
import Login from '../components/auth/Login.tsx'
import ProtectedRoute from './protectedRoute/ProtectedRoute.tsx'
import SignUp from '../components/auth/SignUp.tsx'

export default function AppRouter() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
  ])
  return <RouterProvider router={routes} />
}
