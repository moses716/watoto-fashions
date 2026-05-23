"use client"
import { useState, useEffect } from "react"

type Product = {
  id: number
  name: string
  price: number
  stock: number
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setProducts)
  }, [])

  const resetForm = () => {
    setName("")
    setPrice("")
    setStock("")
    setEditingId(null)
  }

  const handleSubmit = async () => {
    if (!name || !price) return

    if (editingId) {
      // Update
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, name, price, stock })
      })
      const updated = await res.json()
      setProducts(products.map(p => p.id === editingId ? updated : p))
    } else {
      // Create
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, stock })
      })
      const newProduct = await res.json()
      setProducts([...products, newProduct])
    }
    resetForm()
  }

  const startEdit = (p: Product) => {
    setEditingId(p.id)
    setName(p.name)
    setPrice(p.price.toString())
    setStock(p.stock.toString())
  }

  const deleteProduct = async (id: number) => {
    await fetch('/api/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    setProducts(products.filter(p => p.id !== id))
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex gap-2">
        <input placeholder="Product name" value={name} onChange={e => setName(e.target.value)}
          className="border p-2 rounded flex-1" />
        <input placeholder="Price" type="number" value={price} onChange={e => setPrice(e.target.value)}
          className="border p-2 rounded w-32" />
        <input placeholder="Stock" type="number" value={stock} onChange={e => setStock(e.target.value)}
          className="border p-2 rounded w-32" />
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 rounded">
          {editingId ? "Update" : "Add"}
        </button>
        {editingId && <button onClick={resetForm} className="bg-gray-300 px-4 rounded">Cancel</button>}
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b">
                <td className="p-4">{p.name}</td>
                <td className="p-4">KSh {p.price.toLocaleString()}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4 flex gap-3">
                  <button onClick={() => startEdit(p)} className="text-blue-600">Edit</button>
                  <button onClick={() => deleteProduct(p.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}