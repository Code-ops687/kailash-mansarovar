import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getCategories, getMenuItems } from "@/services/menu.service"
import { useCartStore } from "@/store/cart.store"
import { Plus } from "lucide-react"

export function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const addItem = useCartStore((state) => state.addItem)

  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const { data: menuItems, isLoading: loadingMenuItems } = useQuery({
    queryKey: ['menuItems', selectedCategory],
    queryFn: () => getMenuItems(selectedCategory || undefined),
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-primary">Our Menu</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Categories Sidebar */}
        <div className="md:w-1/4">
          <div className="sticky top-24 bg-card rounded-lg p-4 border shadow-sm">
            <h2 className="font-semibold text-lg mb-4 border-b pb-2">Categories</h2>
            {loadingCategories ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-10 bg-muted animate-pulse rounded-md" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col space-y-1">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`text-left px-4 py-2 rounded-md transition-colors ${
                    selectedCategory === null
                      ? "bg-primary text-primary-foreground font-medium"
                      : "hover:bg-muted"
                  }`}
                >
                  All Items
                </button>
                {categories?.map((cat: any) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-left px-4 py-2 rounded-md transition-colors ${
                      selectedCategory === cat.id
                        ? "bg-primary text-primary-foreground font-medium"
                        : "hover:bg-muted"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="md:w-3/4">
          {loadingMenuItems ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-card rounded-lg border shadow-sm animate-pulse flex flex-col p-4">
                  <div className="h-32 bg-muted rounded-md mb-4" />
                  <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems?.map((item: any) => (
                <div key={item.id} className="bg-card rounded-lg border shadow-sm overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-md">
                  <div className="h-48 bg-muted relative">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No Image
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-1">
                      {item.isVeg && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded border border-green-200">Veg</span>}
                      {item.isJain && <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded border border-orange-200">Jain</span>}
                      {!item.isVeg && <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded border border-red-200">Non-Veg</span>}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <span className="font-bold text-primary">₹{item.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
                      {item.description || "Delicious preparation"}
                    </p>
                    <button
                      onClick={() => addItem({
                        id: crypto.randomUUID(),
                        menuItemId: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: 1,
                        image: item.image
                      })}
                      className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors py-2 rounded-md flex items-center justify-center gap-2 font-medium"
                    >
                      <Plus className="h-4 w-4" /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
