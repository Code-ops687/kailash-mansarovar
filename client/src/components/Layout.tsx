import { Outlet, Link } from 'react-router-dom'
import { ShoppingCart, LogOut, Menu as MenuIcon } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useState } from 'react'

export default function Layout() {
  const { user, logout } = useAuthStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-light">
      {/* Header */}
      <header className="bg-secondary text-white shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold font-serif">
            🏔️ Kailash Mansarovar
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/menu" className="hover:text-accent transition">
              Menu
            </Link>
            {user ? (
              <>
                <Link to="/orders" className="hover:text-accent transition">
                  My Orders
                </Link>
                {user.role === 'ADMIN' && (
                  <Link to="/admin" className="hover:text-accent transition">
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 bg-primary px-4 py-2 rounded-lg hover:bg-orange-600"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-accent transition">
                  Login
                </Link>
                <Link to="/register" className="bg-primary px-4 py-2 rounded-lg hover:bg-orange-600">
                  Register
                </Link>
              </>
            )}
            <Link to="/cart" className="relative">
              <ShoppingCart size={24} />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            <MenuIcon size={24} />
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-secondary-dark p-4 flex flex-col gap-3">
            <Link to="/menu" className="hover:text-accent">
              Menu
            </Link>
            {user ? (
              <>
                <Link to="/orders" className="hover:text-accent">
                  My Orders
                </Link>
                <button onClick={logout} className="text-left hover:text-accent">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-accent">
                  Login
                </Link>
                <Link to="/register" className="hover:text-accent">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-white text-center py-6 mt-12">
        <p>&copy; 2024 Kailash Mansarovar. All rights reserved.</p>
      </footer>
    </div>
  )
}
