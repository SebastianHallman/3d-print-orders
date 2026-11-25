import type { Order } from "@/api/orders";

export default function AdminRow({ order, onOrderStatusChanged, onOrderDelete}: { order: Order, onOrderStatusChanged: (id: number, status: string) => void, onOrderDelete: (id: number) => void}) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-4 py-4">
      <div className="min-w-0 wrap-anywhere">
        <p className="font-semibold">{order.model}</p>
        <p>{order.customer}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex flex-wrap items-center gap-2 text-sm">
          Status
          <select
            value={order.status.toUpperCase()}
            className="rounded-md border border-foreground/40 bg-background px-3 py-2 text-foreground"
            onChange={(e) => onOrderStatusChanged(order.id, e.currentTarget.value)}
          >
            <option value="QUEUED">Queued</option>
            <option value="PRINTING">Printing</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </label>
        <button
          type="button"
          aria-label={`Delete order ${order.id}`}
          className="rounded-md border border-rose bg-blush px-3 py-2 text-sm font-medium text-cocoa disabled:opacity-65"
          onClick={() => onOrderDelete(order.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
