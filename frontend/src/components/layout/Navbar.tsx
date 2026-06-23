import { Link } from "react-router-dom"
import { ShoppingCart, Menu, User } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import { useCartStore } from "@/store/cart.store"

export function Navbar() {
  const { items } = useCartStore()
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl text-primary">RestaurantHub</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/menu" className="text-sm font-medium hover:text-primary transition-colors">
              Menu
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link to="/cart" className="relative p-2 rounded-md hover:bg-muted transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 text-[10px] flex items-center justify-center bg-primary text-primary-foreground rounded-full font-bold">
                {itemCount}
              </span>
            )}
          </Link>
          <Link to="/login" className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
            <User className="h-5 w-5" />
            <span>Login</span>
          </Link>
          <button className="md:hidden p-2 rounded-md hover:bg-muted">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
