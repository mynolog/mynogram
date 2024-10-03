import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../components/layout/Layout.tsx'
import Home from '../pages/home/Home.tsx'
import Login from '../components/auth/Login.tsx'
import MyPage from '../pages/myPage/MyPage.tsx'
import SignUp from '../components/auth/SignUp.tsx'
import ProtectedRoute from './protectedRoute/ProtectedRoute.tsx'
import PublicOnlyRoute from './PublicOnlyRoute/PublicOnlyRoute.tsx'

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
        {
          path: '/my-page',
          element: <MyPage />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: (
        <PublicOnlyRoute>
          <SignUp />
        </PublicOnlyRoute>
      ),
    },
  ])
  return <RouterProvider router={routes} />
}
