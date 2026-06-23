import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import AdminDashboard from './pages/admin/Dashboard'
import AdminMenu from './pages/admin/Menu'
import AdminOrders from './pages/admin/Orders'
import ProtectedRoute from './components/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'menu', element: <Menu /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'orders', element: <Orders /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
  {
    path: '/admin',
    element: <ProtectedRoute><AdminDashboard /></ProtectedRoute>,
    children: [
      { path: 'menu', element: <AdminMenu /> },
      { path: 'orders', element: <AdminOrders /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
