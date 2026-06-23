import { Link } from "react-router-dom"
import { ArrowRight, Utensils } from "lucide-react"

export function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="text-center space-y-6 max-w-3xl px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-r from-primary to-yellow-600 bg-clip-text text-transparent pb-2">
          RestaurantHub
        </h1>
        <p className="text-xl text-muted-foreground md:text-2xl">
          Experience fine dining with our seamless digital menu and ordering system.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link
            to="/menu"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
          >
            <Utensils className="h-5 w-5" />
            View Menu
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-2 bg-muted text-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-muted/80 transition-colors w-full sm:w-auto justify-center"
          >
            Staff Login
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
