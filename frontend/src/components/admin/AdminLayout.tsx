import { Outlet, Link, useLocation } from "react-router-dom"
import { 
  LayoutDashboard, 
  Users, 
  UtensilsCrossed, 
  Settings, 
  LogOut,
  QrCode,
  LineChart
} from "lucide-react"
import { ThemeToggle } from "../layout/ThemeToggle"

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "Menu Management", icon: UtensilsCrossed, href: "/admin/menu" },
  { label: "Staff", icon: Users, href: "/admin/staff" },
  { label: "Tables & QR", icon: QrCode, href: "/admin/tables" },
  { label: "Analytics", icon: LineChart, href: "/admin/analytics" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
]

export function AdminLayout() {
  const location = useLocation()

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r flex flex-col">
        <div className="h-16 flex items-center px-6 border-b">
          <span className="font-bold text-xl text-primary">RestaurantHub</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors font-medium ${
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t space-y-4">
          <ThemeToggle />
          <button className="flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 w-full rounded-md font-medium transition-colors">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-muted/30 p-8">
        <Outlet />
      </main>
    </div>
  )
}
