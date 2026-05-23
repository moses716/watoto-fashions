import{formatKsh} from "../format"

type CartItem = {
  name: string;
  price: number;
  qty: number
}

type ReceiptProps = {
  items: CartItem[];
  total: number;
  orderId: string;
}

export default function Receipt({ items, total, orderId }: ReceiptProps) {
  return (
    <div id="receipt" className="w-[58mm] p-2 text-[12px] font-mono">
      <div className="text-center mb-2">
        <h2 className="text-lg font-bold">WATOTO FASHIONS</h2>
        <p>Nairobi, Kenya</p>
        <p>Tel: 0796 443 461</p>
      </div>

      <div className="border-t border-dashed border-gray-400 my-2"></div>

      <div className="mb-2">
        <p>Receipt #: {orderId}</p>
        <p>Date: {new Date().toLocaleString('en-KE')}</p>
      </div>

      <div className="border-t border-dashed border-gray-400 my-2"></div>

      <div className="mb-2">
        {items.map((item, idx) => (
          <div key={idx} className="mb-1">
            <div className="flex justify-between">
              <span>{item.name}</span>
              <span>{formatKsh(item.price * item.qty)}</span>
            </div>
            <div className="text-gray-600">
              {item.qty} x {formatKsh(item.price)}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-dashed border-gray-400 my-2"></div>

      <div className="flex justify-between font-bold text-[14px]">
        <span>Total:</span>
        <span>{formatKsh(total)}</span>
      </div>

      <div className="text-center mt-3">
        <p>Asante kwa kununua!</p>
      </div>
    </div>
  )
}