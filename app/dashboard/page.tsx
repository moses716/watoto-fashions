"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { name: "Mon", sales: 1200 },
  { name: "Tue", sales: 2100 },
  { name: "Wed", sales: 1800 },
  { name: "Thu", sales: 2400 },
  { name: "Fri", sales: 3200 },
]

const formatKSh = (v: number) => `KSh ${v.toLocaleString()}`

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Total Sales</p>
          <p className="text-3xl font-bold">{formatKSh(10700)}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Products Sold</p>
          <p className="text-3xl font-bold">128</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Orders</p>
          <p className="text-3xl font-bold">45</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="font-bold mb-4">Sales This Week</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(v) => `KSh ${v / 1000}k`} />
            <Tooltip formatter={(v: any) => formatKSh(v)} />
            <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}