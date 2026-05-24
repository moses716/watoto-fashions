export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Watoto Fashions</h1>
          <span className="text-sm text-slate-500">POS System</span>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Welcome Back</h2>
          <p className="text-lg text-slate-600">Manage your store fast and simple</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border-slate-200">
            <p className="text-sm text-slate-500">Today's Sales</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">TZS 0</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border-slate-200">
            <p className="text-sm text-slate-500">Products</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">0</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border-slate-200">
            <p className="text-sm text-slate-500">Low Stock</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">0</p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/pos" className="group bg-blue-600 hover:bg-blue-700 p-8 rounded-2xl text-white transition-all shadow-lg hover:shadow-xl">
            <h3 className="text-2xl font-bold mb-2">Start Sale</h3>
            <p className="opacity-90">Open checkout and process orders</p>
          </a>

          <a href="/inventory" className="group bg-white hover:bg-slate-50 p-8 rounded-2xl text-slate-900 transition-all shadow-sm border-slate-200 hover:shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Inventory</h3>
            <p className="text-slate-600">Add, edit and track products</p>
          </a>

          <a href="/reports" className="group bg-white hover:bg-slate-50 p-8 rounded-2xl text-slate-900 transition-all shadow-sm border-slate-200 hover:shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Reports</h3>
            <p className="text-slate-600">View sales and analytics</p>
          </a>
        </div>
      </section>
    </main>
  )
}