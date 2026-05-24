'use client'
import { useState } from 'react'

export default function POS() {
  const [cart, setCart] = useState([
    { id: 1, name: 'Black t-shirt', price: 2200, qty: 1 },
    { id: 2, name: 'Wide high jeans', price: 7530, qty: 1 },
  ])

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  const checkout = () => {
    alert(Checkout successful! Total: KES ${total.toLocaleString()})
    setCart([])
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white px-4 py-3 flex items-center justify-between border-b sticky top-0 z-10">
        <button onClick={() => window.history.back()} className="text-gray-600">← Back</button>
        <h1 className="text-xl font-bold">Receipt</h1>
        <button className="px-3 py-1 border rounded-full text-sm">Find Item</button>
      </header>

      <div className="px-4 py-4">
        <p className="text-sm text-gray-500 mb-3">{cart.length} Items</p>
        
        {cart.length === 0 ? (
          <p className="text-center text-gray-400 mt-20">Cart is empty</p>
        ) : (
          <div className="space-y-3">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                </div>
                <p className="font-bold">KES {item.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-4 flex items-center justify-between shadow-lg">
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold">KES {total.toLocaleString()}</p>
          </div>
          <button 
            onClick={checkout}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Checkout
          </button>
        </div>
      )}
    </main>
  )
}