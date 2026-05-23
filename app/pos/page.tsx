"use client"
import { useState, useEffect } from "react"
import { Search, Plus, Minus, Trash2, ScanLine } from "lucide-react"
import BarcodeScanner from "@/lib/components/barcodescanner"
import { formatKsh } from "@/lib/format"
type Product = { id: string; name: string; price: number; barcode: string }
type CartItem = Product & { qty: number }

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [showScanner, setShowScanner] = useState(false)
  const [products] = useState<Product[]>([
    { id: "1", name: "Kids T-Shirt", price: 800, barcode: "123456" },
    { id: "2", name: "Baby Romper", price: 1200, barcode: "234567" },
    { id: "3", name: "Kids Shorts", price: 600, barcode: "345678" },
  ])

  const channel = typeof window !== "undefined" ? new BroadcastChannel("pos-channel") : null

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
    channel?.postMessage({ total, items: cart })
  }, [cart, channel])

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id)
      if (existing) return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) setCart(prev => prev.filter(p => p.id !== id))
    else setCart(prev => prev.map(p => p.id === id ? { ...p, qty } : p))
  }

  const handleScan = (barcode: string) => {
    const product = products.find(p => p.barcode === barcode)
    if (product) addToCart(product)
    setShowScanner(false)
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left - Products */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Watoto Fashions POS</h1>
          <button 
            onClick={() => setShowScanner(!showScanner)}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <ScanLine size={20} /> Scan
          </button>
        </div>

        {showScanner && <BarcodeScanner onScan={handleScan} />}

        <div className="grid grid-cols-3 gap-4 mt-4">
          {products.map(product => (
            <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md cursor-pointer"
                 onClick={() => addToCart(product)}>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-blue-600 font-bold mt-2">{formatKsh(product.price)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right - Cart */}
      <div className="w-96 bg-white border-l border-gray-200 p-6 flex-col">
        <h2 className="text-xl font-bold mb-4">Cart</h2>
        <div className="flex-1 overflow-y-auto">
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between py-3 border-b">
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{formatKsh(item.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQty(item.id, item.qty - 1)} className="p-1 bg-gray-100 rounded">
                  <Minus size={16} />
                </button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)} className="p-1 bg-gray-100 rounded">
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between text-xl font-bold mb-4">
            <span>Total:</span>
            <span>{formatKsh(total)}</span>
          </div>
          <button 
            onClick={() => window.location.href = `/pos/checkout?total=${total}`}
            className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}