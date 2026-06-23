import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Receipt, CreditCard, Banknote, IndianRupee } from "lucide-react"

export function CashierDashboard() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  // Mocked orders for demo
  const orders = [
    { id: 1, table: 2, amount: 1250, status: "UNPAID", items: [{name: "Butter Chicken", qty: 1, price: 450}, {name: "Naan", qty: 3, price: 60}, {name: "Paneer Tikka", qty: 1, price: 320}, {name: "Lassi", qty: 2, price: 150}] },
    { id: 2, table: 4, amount: 840, status: "UNPAID", items: [{name: "Veg Biryani", qty: 2, price: 350}, {name: "Raita", qty: 1, price: 140}] },
  ]

  return (
    <div className="container mx-auto p-6 min-h-screen flex gap-6">
      {/* Left side: Orders list */}
      <div className="w-1/3 bg-card border rounded-xl shadow-sm p-4 h-[calc(100vh-3rem)] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-primary border-b pb-4">Pending Bills</h2>
        <div className="space-y-4">
          {orders.map(order => (
            <div 
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedOrder?.id === order.id ? 'border-primary bg-primary/5' : 'border-transparent bg-muted hover:bg-muted/80'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">Table {order.table}</span>
                <span className="text-primary font-bold">₹{order.amount}</span>
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Receipt className="h-4 w-4" />
                {order.items.length} items
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side: Billing interface */}
      <div className="w-2/3 bg-card border rounded-xl shadow-sm p-6 h-[calc(100vh-3rem)] flex flex-col">
        {selectedOrder ? (
          <>
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-3xl font-bold">Table {selectedOrder.table} Bill</h2>
              <span className="text-2xl font-bold text-primary">Total: ₹{selectedOrder.amount}</span>
            </div>

            <div className="flex-1 overflow-y-auto mb-6 bg-muted/30 rounded-lg p-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="pb-2">Item</th>
                    <th className="pb-2 text-center">Qty</th>
                    <th className="pb-2 text-right">Price</th>
                    <th className="pb-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {selectedOrder.items.map((item: any, i: number) => (
                    <tr key={i}>
                      <td className="py-3 font-medium">{item.name}</td>
                      <td className="py-3 text-center">{item.qty}</td>
                      <td className="py-3 text-right">₹{item.price}</td>
                      <td className="py-3 text-right font-bold">₹{item.price * item.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-8 pt-4 border-t-2 border-dashed space-y-2 text-right">
                <div className="flex justify-end gap-16 text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{selectedOrder.items.reduce((a:any, b:any) => a + (b.price*b.qty), 0)}</span>
                </div>
                <div className="flex justify-end gap-16 text-muted-foreground">
                  <span>CGST (2.5%)</span>
                  <span>₹{(selectedOrder.amount * 0.025).toFixed(2)}</span>
                </div>
                <div className="flex justify-end gap-16 text-muted-foreground">
                  <span>SGST (2.5%)</span>
                  <span>₹{(selectedOrder.amount * 0.025).toFixed(2)}</span>
                </div>
                <div className="flex justify-end gap-16 font-bold text-xl pt-2">
                  <span>Grand Total</span>
                  <span className="text-primary">₹{(selectedOrder.amount * 1.05).toFixed(0)}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button className="flex flex-col items-center justify-center gap-2 bg-green-100 text-green-700 hover:bg-green-200 p-4 rounded-xl font-bold transition-colors">
                <Banknote className="h-6 w-6" /> Cash
              </button>
              <button className="flex flex-col items-center justify-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200 p-4 rounded-xl font-bold transition-colors">
                <CreditCard className="h-6 w-6" /> Card
              </button>
              <button className="flex flex-col items-center justify-center gap-2 bg-purple-100 text-purple-700 hover:bg-purple-200 p-4 rounded-xl font-bold transition-colors">
                <IndianRupee className="h-6 w-6" /> UPI
              </button>
            </div>
            <button className="mt-4 w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl shadow hover:opacity-90 transition-opacity">
              Complete Payment & Print Invoice
            </button>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
            <Receipt className="h-20 w-20 mb-4 opacity-20" />
            <p className="text-xl font-medium">Select an order from the list to view the bill.</p>
          </div>
        )}
      </div>
    </div>
  )
}
