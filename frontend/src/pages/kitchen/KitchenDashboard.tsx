import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getOrders, updateOrderStatus } from "@/services/order.service"
import { socketService } from "@/services/socket.service"
import { Clock, CheckCircle2, Flame, ChefHat } from "lucide-react"

export function KitchenDashboard() {
  const restaurantId = "demo-kailash" // Mocked for demo
  const [activeOrders, setActiveOrders] = useState<any[]>([])

  const { data: initialOrders, isLoading } = useQuery({
    queryKey: ['orders', 'kitchen'],
    queryFn: () => getOrders(restaurantId, "PENDING"),
  })

  useEffect(() => {
    if (initialOrders) {
      setActiveOrders(initialOrders)
    }
  }, [initialOrders])

  useEffect(() => {
    socketService.connect()
    socketService.joinKitchen(restaurantId)

    socketService.onNewOrder((order) => {
      setActiveOrders((prev) => [order, ...prev])
      // Optional: Play a sound notification here
    })

    socketService.onOrderUpdated((updatedOrder) => {
      setActiveOrders((prev) => 
        prev.map(order => order.id === updatedOrder.id ? updatedOrder : order)
            .filter(order => order.status !== "READY" && order.status !== "SERVED")
      )
    })

    return () => {
      socketService.off('newOrder')
      socketService.off('orderUpdated')
      socketService.disconnect()
    }
  }, [restaurantId])

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      // Socket will broadcast the update, but we can optimistically update
      setActiveOrders((prev) => 
        prev.map(order => order.id === orderId ? { ...order, status: newStatus } : order)
            .filter(order => order.status !== "READY" && order.status !== "SERVED")
      )
    } catch (error) {
      console.error("Failed to update status", error)
    }
  }

  if (isLoading) {
    return <div className="p-8 text-center"><ChefHat className="h-12 w-12 animate-pulse mx-auto mb-4" /> Loading kitchen orders...</div>
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <header className="flex items-center justify-between mb-8 border-b pb-4">
        <div className="flex items-center gap-3 text-primary">
          <Flame className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Kitchen Display System</h1>
        </div>
        <div className="text-muted-foreground font-medium">
          {activeOrders.length} Active Orders
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {activeOrders.map((order) => (
          <div key={order.id} className="bg-card border-2 border-primary/20 rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className={`p-4 text-white font-bold flex justify-between items-center ${
              order.status === 'PENDING' ? 'bg-orange-500' : 'bg-blue-500'
            }`}>
              <div className="flex items-center gap-2">
                <span>#{order.orderNumber}</span>
                <span className="text-xs bg-black/20 px-2 py-1 rounded">
                  {order.orderType === "DINE_IN" ? `Table ${order.table?.tableNumber || '?'}` : order.orderType}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Clock className="h-4 w-4" />
                {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            
            <div className="p-4 flex-grow space-y-4">
              {order.orderItems?.map((item: any) => (
                <div key={item.id} className="border-b pb-2 last:border-0 last:pb-0">
                  <div className="flex justify-between font-medium">
                    <span>{item.quantity}x {item.menuItem.name}</span>
                  </div>
                  {item.notes && (
                    <p className="text-sm text-red-500 mt-1 italic">Note: {item.notes}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 bg-muted/50 border-t">
              {order.status === 'PENDING' ? (
                <button 
                  onClick={() => handleStatusChange(order.id, 'PREPARING')}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold transition-colors"
                >
                  Start Preparing
                </button>
              ) : (
                <button 
                  onClick={() => handleStatusChange(order.id, 'READY')}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <CheckCircle2 className="h-5 w-5" /> Mark Ready
                </button>
              )}
            </div>
          </div>
        ))}
        
        {activeOrders.length === 0 && (
          <div className="col-span-full py-20 text-center text-muted-foreground flex flex-col items-center">
            <ChefHat className="h-16 w-16 mb-4 opacity-50" />
            <h3 className="text-2xl font-bold">Kitchen is clear!</h3>
            <p>Waiting for new orders...</p>
          </div>
        )}
      </div>
    </div>
  )
}
