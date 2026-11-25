"use client";

import { useEffect, useState } from "react";
import getCsrf, { logoutRequest } from "@/api/auth";
import getOrders, { deleteOrder, updateOrder, type Order } from "@/api/orders";
import AdminRow from "@/components/adminRow";

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [csrfToken, setCsrfToken] = useState("");
  const [error, setError] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getOrders(signal)
      .then(async (orders) => {
        if (signal.aborted) return;
        if (orders === null) {
          window.location.replace("/admin/login");
          return;
        }
        const token = await getCsrf();
        if (!signal.aborted) {
          setCsrfToken(token);
          setOrders(orders);
        }
      })
      .catch(() => {
        if (!signal.aborted) setError(true);
      });

    return () => controller.abort();
  }, []);

  async function onUpdateOrder(id: number, status: string) {
    try {
      const res  = await updateOrder(id, status, csrfToken)


    if (res.ok) {
      const updatedOrder: Order = await res.json();
      setOrders(current =>
      current?.map(order => order.id === id ? updatedOrder : order) ?? null
      );
      setStatus("Status on order #" + id.toString() + " changed to " + status)
      
    } else {
      setStatus("Could not update order #" + id.toString())
    }
    
      
    } catch (error) {
      console.log(error);
    }
    
  }

  async function onDeleteOrder(id: number) {

    try {
    
    const res = await deleteOrder(id, csrfToken)


    if (res.ok) {
      setOrders(current => current?.filter(order => order.id !== id) ?? null);
      setStatus("Order #" + id.toString() + " deleted ");
    } else {
      setStatus("Could not delete order #" + id.toString());
      
    } 
    } catch (error) {
      console.log(error)      

    }
    
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Admin dashboard</h1>
        {csrfToken && (
          <form {...logoutRequest}>
            <input type="hidden" name="_csrf" value={csrfToken} />
            <button className="rounded-md border border-cocoa bg-pistachio px-4 py-2 font-medium text-cocoa hover:bg-blush">
              Log out
            </button>
          </form>
        )}
      </header>

      {status ?? (
        <p>{status}</p>  
      )}
      {error ? (
        <p role="alert" className="mt-6">
          Could not load the dashboard. <a className="underline" href="/admin">Try again</a>
          {" or "}<a className="underline" href={logoutRequest.action}>log out</a>.
        </p>
      ) : orders === null ? (
        <p role="status" className="mt-6">Loading orders…</p>
      ) : (
        <section className="mt-8 rounded-3xl bg-background p-6 shadow-lg">
          <h2 className="text-xl font-semibold">Print orders</h2>
          {orders.length === 0 ? (
            <p className="mt-4">No orders yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-foreground/20">
              {orders.map((order) => (
                <AdminRow key={order.id} order={order} onOrderDelete={onDeleteOrder} onOrderStatusChanged={onUpdateOrder}/>
              ))}
            </ul>
          )}
        </section>
      )}
    </main>
  );
}
