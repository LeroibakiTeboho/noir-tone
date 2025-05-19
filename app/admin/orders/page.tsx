"use client";

import { useCart } from "@/contexts/CartContext";

export default function AdminOrdersPage() {
  const { state } = useCart();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gold mb-8">Order Management</h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>
                  <select
                    value={order.status}
                    className="select select-bordered"
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
                <td>${order.total.toFixed(2)}</td>
                <td>
                  <button className="btn btn-ghost btn-sm">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
