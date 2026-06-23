import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { RootLayout } from "./components/layout/RootLayout"
import { HomePage } from "./pages/public/HomePage"
import { MenuPage } from "./pages/public/MenuPage"
import { CartPage } from "./pages/public/CartPage"
import { OrderSuccessPage } from "./pages/public/OrderSuccessPage"
import { NotFoundPage } from "./pages/public/NotFoundPage"
import { KitchenDashboard } from "./pages/kitchen/KitchenDashboard"
import { AdminLayout } from "./components/admin/AdminLayout"
import { AdminDashboardHome } from "./pages/admin/AdminDashboardHome"
import { WaiterDashboard } from "./pages/waiter/WaiterDashboard"
import { CashierDashboard } from "./pages/cashier/CashierDashboard"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="order-success/:orderId" element={<OrderSuccessPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/kitchen" element={<KitchenDashboard />} />
          <Route path="/waiter" element={<WaiterDashboard />} />
          <Route path="/cashier" element={<CashierDashboard />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardHome />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
