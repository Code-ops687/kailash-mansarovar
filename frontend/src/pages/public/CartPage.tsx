import { useCartStore } from "@/store/cart.store"
import { createOrder } from "@/services/order.service"
import { useMutation } from "@tanstack/react-query"
import { Trash2, Plus, Minus, CreditCard, Utensils } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

export function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCartStore()
  const navigate = useNavigate()
  const [orderType, setOrderType] = useState("DINE_IN")
  const [tableNumber, setTableNumber] = useState("")

  const orderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      clearCart()
      navigate(`/order-success/${data.id}`)
    },
    onError: (error) => {
      console.error("Failed to place order", error)
      alert("Failed to place order. Please try again.")
    }
  })

  const handleCheckout = () => {
    // Hardcoded restaurantId for demo
    const payload = {
      restaurantId: "demo-kailash", // Normally from context
      orderType,
      tableId: tableNumber || null,
      items: items.map(i => ({
        menuItemId: i.menuItemId,
        quantity: i.quantity,
        price: i.price,
        notes: i.notes
      }))
    }
    orderMutation.mutate(payload)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Utensils className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8">Looks like you haven't added any items to your cart yet.</p>
        <Link to="/menu" className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:opacity-90">
          Browse Menu
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-card p-4 rounded-lg border shadow-sm">
              <div className="h-20 w-20 bg-muted rounded overflow-hidden flex-shrink-0">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No img</div>
                )}
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-primary font-medium">₹{item.price}</p>
              </div>
              <div className="flex items-center gap-3 bg-muted rounded-md p-1">
                <button 
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="p-1 hover:bg-background rounded"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-4 text-center font-medium">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 hover:bg-background rounded"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button 
                onClick={() => removeItem(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-card p-6 rounded-lg border shadow-sm h-fit space-y-6">
          <h2 className="text-xl font-bold border-b pb-4">Order Summary</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Order Type</label>
              <select 
                value={orderType} 
                onChange={(e) => setOrderType(e.target.value)}
                className="w-full border rounded-md p-2 bg-background"
              >
                <option value="DINE_IN">Dine In</option>
                <option value="TAKEAWAY">Takeaway</option>
              </select>
            </div>
            
            {orderType === "DINE_IN" && (
              <div>
                <label className="block text-sm font-medium mb-1">Table Number</label>
                <input 
                  type="text" 
                  value={tableNumber} 
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="e.g. 12"
                  className="w-full border rounded-md p-2 bg-background"
                />
              </div>
            )}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax (5%)</span>
              <span>₹{(total * 0.05).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span className="text-primary">₹{(total * 1.05).toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={handleCheckout}
            disabled={orderMutation.isPending}
            className="w-full bg-primary text-primary-foreground py-3 rounded-md font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50"
          >
            {orderMutation.isPending ? "Processing..." : (
              <>
                <CreditCard className="h-5 w-5" /> Place Order
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
