"use client"

export default function BarcodeScanner({ onScan }: { onScan: (code: string) => void }) {
  return (
    <div className="p-4 border rounded">
      <p className="text-sm text-gray-500">Barcode scanner disabled for now</p>
      <input 
        placeholder="Type barcode manually" 
        className="w-full p-2 border rounded mt-2"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onScan((e.target as HTMLInputElement).value)
          }
        }}
      />
    </div>
  )
}