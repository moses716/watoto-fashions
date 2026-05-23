"use client"
import { useEffect, useState } from "react"
import { formatKsh } from "@/lib/format"

export default function CustomerDisplay() {
  const [total, setTotal] = useState(0)
  const [time, setTime] = useState("")

  useEffect(() => {
    const channel = new BroadcastChannel("pos-channel")
    channel.onmessage = (e) => setTotal(e.data.total)
    
    const updateTime = () => setTime(new Date().toLocaleTimeString('en-KE'))
    updateTime()
    setInterval(updateTime, 1000)
  }, [])

  return (
    <div className="h-screen bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-2">Watoto Fashions</h1>
      <p className="text-xl opacity-90 mb-8">Quality Kids Wear</p>
      <p className="text-2xl mb-4">Total Amount</p>
      <p className="text-8xl font-bold">{formatKsh(total)}</p>
      <p className="text-3xl mt-8">{time}</p>
      <p className="text-xl mt-4 opacity-90">Please scan your items</p>
    </div>
  )
}