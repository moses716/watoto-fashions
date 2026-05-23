"use client"
import { useState, useEffect } from "react"

type Product = {
  id: number
  name: string
  price: number
  stock: number
}

type CartItem = Product & { qty: number }

export default function CheckoutPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts)
  }, [])

  const addToCart = (product: Product) => {
    if (product.stock === 0) return alert("Out of stock!")
    
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id)
      if (existing) {
        return prev.map(p => 
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const checkout = async () => {
    if (cart.length === 0) return alert("Cart is empty!")

    const res = await fetch('/api/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart })
    })

    if (res.ok) {
      alert("Sale completed!")
      setCart([])
      // Refresh products to get updated stock
      fetch('/api/products').then(res => res.json()).then(setProducts)
    } else {
      alert("Checkout failed!")
    }
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div className="p-6 grid-cols-3 gap-6">
      <div className="col-span-2">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <div className="grid grid-cols-3 gap-4">
          {products.map(p => (
            <div key={p.id} className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-gray-600">KSh {p.price.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Stock: {p.stock}</p>
              <button 
                onClick={() => addToCart(p)}
                disabled={p.stock === 0}
                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded disabled:bg-gray-300"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Cart</h2>
        {cart.map(item => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>{item.name} x{item.qty}</span>
            <span>KSh {(item.price * item.qty).toLocaleString()}</span>
          </div>
        ))}
        <div className="border-t mt-4 pt-4 font-bold">
          Total: KSh {total.toLocaleString()}
        </div>
        <button 
          onClick={checkout}
          className="w-full mt-4 bg-green-600 text-white py-2 rounded"
        >
          Checkout
        </button>
      </div>
    </div>
  )
}