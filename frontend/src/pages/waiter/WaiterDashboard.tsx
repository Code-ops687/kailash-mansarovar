import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Users, Plus, Check } from "lucide-react"
// mock getTables function
const getTables = async () => [
  { id: 1, tableNumber: 1, capacity: 4, status: "AVAILABLE" },
  { id: 2, tableNumber: 2, capacity: 2, status: "OCCUPIED" },
  { id: 3, tableNumber: 3, capacity: 6, status: "AVAILABLE" },
  { id: 4, tableNumber: 4, capacity: 4, status: "OCCUPIED" },
  { id: 5, tableNumber: 5, capacity: 8, status: "RESERVED" },
]

export function WaiterDashboard() {
  const { data: tables, isLoading } = useQuery({
    queryKey: ['tables'],
    queryFn: getTables,
  })

  if (isLoading) return <div className="p-8">Loading tables...</div>

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <header className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-primary">Waiter Dashboard</h1>
        <div className="flex gap-4">
          <span className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-green-500"></div> Available</span>
          <span className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-red-500"></div> Occupied</span>
          <span className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> Reserved</span>
        </div>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {tables?.map((table: any) => (
          <div 
            key={table.id} 
            className={`border-2 rounded-xl p-4 flex flex-col items-center justify-center aspect-square transition-all hover:scale-105 cursor-pointer shadow-sm ${
              table.status === 'AVAILABLE' ? 'border-green-500 bg-green-50/10' :
              table.status === 'OCCUPIED' ? 'border-red-500 bg-red-50/10' :
              'border-yellow-500 bg-yellow-50/10'
            }`}
          >
            <span className="text-4xl font-bold mb-2 text-foreground">{table.tableNumber}</span>
            <div className="flex items-center gap-1 text-muted-foreground mb-4">
              <Users className="h-4 w-4" />
              <span>{table.capacity} Seats</span>
            </div>
            
            {table.status === 'AVAILABLE' ? (
              <button className="bg-green-500 text-white px-4 py-2 rounded-md w-full font-medium flex items-center justify-center gap-2 hover:bg-green-600 transition-colors">
                <Plus className="h-4 w-4" /> Seat
              </button>
            ) : table.status === 'OCCUPIED' ? (
              <button className="bg-red-500 text-white px-4 py-2 rounded-md w-full font-medium flex items-center justify-center gap-2 hover:bg-red-600 transition-colors">
                Order
              </button>
            ) : (
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-md w-full font-medium flex items-center justify-center gap-2 hover:bg-yellow-600 transition-colors">
                <Check className="h-4 w-4" /> Arrived
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
