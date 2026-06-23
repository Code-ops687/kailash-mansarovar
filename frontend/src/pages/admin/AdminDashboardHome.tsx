import { Users, DollarSign, Utensils, Receipt } from "lucide-react"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from "recharts"

const salesData = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 2000 },
  { name: "Thu", sales: 2780 },
  { name: "Fri", sales: 5890 },
  { name: "Sat", sales: 8390 },
  { name: "Sun", sales: 7490 },
]

const recentOrders = [
  { id: "ORD-101", table: "12", amount: "₹1,250", status: "Completed", time: "10 mins ago" },
  { id: "ORD-102", table: "4", amount: "₹840", status: "Preparing", time: "15 mins ago" },
  { id: "ORD-103", table: "Takeaway", amount: "₹450", status: "Pending", time: "22 mins ago" },
  { id: "ORD-104", table: "8", amount: "₹2,100", status: "Completed", time: "1 hour ago" },
]

export function AdminDashboardHome() {
  const stats = [
    { title: "Total Revenue", value: "₹45,231", icon: DollarSign, trend: "+20.1% from last month" },
    { title: "Total Orders", value: "356", icon: Receipt, trend: "+12.5% from last month" },
    { title: "Active Menu Items", value: "142", icon: Utensils, trend: "+4 new items" },
    { title: "Staff Members", value: "24", icon: Users, trend: "0 changes" },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-card p-6 rounded-xl border shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-muted-foreground font-medium text-sm">{stat.title}</p>
                <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-card rounded-xl border shadow-sm p-6 h-[400px] flex flex-col">
          <h3 className="font-bold text-lg mb-6">Weekly Sales Overview</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}`} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="sales" fill="#D4AF37" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-card rounded-xl border shadow-sm p-6 h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Recent Orders</h3>
            <button className="text-primary text-sm hover:underline font-medium">View All</button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4">
            {recentOrders.map(order => (
              <div key={order.id} className="flex justify-between items-center p-3 hover:bg-muted rounded-lg transition-colors border border-transparent hover:border-border">
                <div className="flex gap-4 items-center">
                  <div className="h-10 w-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                    {order.table}
                  </div>
                  <div>
                    <p className="font-bold">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{order.amount}</p>
                  <p className={`text-xs font-medium ${
                    order.status === 'Completed' ? 'text-green-500' :
                    order.status === 'Preparing' ? 'text-blue-500' : 'text-orange-500'
                  }`}>
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
