import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { socketService } from "@/services/socket.service"
import { CheckCircle2, Clock, ChefHat, Utensils, PartyPopper } from "lucide-react"

const STATUS_STEPS = [
  { key: "PENDING", label: "Order Placed", icon: CheckCircle2, color: "text-green-500" },
  { key: "PREPARING", label: "Being Prepared", icon: ChefHat, color: "text-blue-500" },
  { key: "READY", label: "Ready to Serve", icon: Utensils, color: "text-orange-500" },
  { key: "SERVED", label: "Served!", icon: PartyPopper, color: "text-primary" },
]

export function OrderSuccessPage() {
  const { orderId } = useParams()
  const [currentStatus, setCurrentStatus] = useState("PENDING")

  useEffect(() => {
    socketService.connect()
    if (orderId) {
      socketService.joinOrder(orderId)
    }

    socketService.onStatusUpdated((data) => {
      setCurrentStatus(data.status)
    })

    return () => {
      socketService.off('statusUpdated')
      socketService.disconnect()
    }
  }, [orderId])

  const currentIndex = STATUS_STEPS.findIndex(s => s.key === currentStatus)

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
      {/* Hero */}
      <div className="mb-12 animate-bounce-slow">
        <CheckCircle2 className="h-24 w-24 mx-auto text-green-500 mb-6" />
        <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground text-lg">Your delicious food is on its way.</p>
      </div>

      {/* Live Status Tracker */}
      <div className="bg-card border rounded-2xl p-8 mb-8 shadow-sm">
        <h2 className="font-bold text-xl mb-8 flex items-center justify-center gap-2">
          <Clock className="h-5 w-5 text-primary" /> Live Order Tracking
        </h2>
        <div className="flex justify-between items-center relative">
          {/* Progress Bar */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-muted rounded-full mx-12">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
              style={{ width: `${(currentIndex / (STATUS_STEPS.length - 1)) * 100}%` }}
            />
          </div>

          {STATUS_STEPS.map((step, i) => {
            const isActive = i <= currentIndex
            const isCurrent = i === currentIndex
            return (
              <div key={step.key} className="flex flex-col items-center relative z-10">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isActive 
                    ? 'bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/30' 
                    : 'bg-muted text-muted-foreground'
                } ${isCurrent ? 'ring-4 ring-primary/20 animate-pulse' : ''}`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <span className={`text-xs mt-3 font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 justify-center">
        <Link 
          to="/menu" 
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Order More
        </Link>
        <Link 
          to="/" 
          className="border border-border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
