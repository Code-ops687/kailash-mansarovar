import { Link } from "react-router-dom"
import { Home, ArrowLeft } from "lucide-react"

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="relative mb-8">
        <span className="text-[12rem] font-black text-primary/10 leading-none select-none">404</span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl">🍽️</span>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-3">Page Not Found</h1>
      <p className="text-muted-foreground text-lg mb-8 max-w-md">
        Oops! Looks like this dish isn't on our menu. Let's get you back to something delicious.
      </p>

      <div className="flex gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          <Home className="h-5 w-5" /> Go Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 border border-border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-5 w-5" /> Go Back
        </button>
      </div>
    </div>
  )
}
