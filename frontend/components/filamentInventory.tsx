import { Suspense } from "react";
import StockList from "./stockList";

export default function FilamentInventory() {
  return (
    <section aria-labelledby="filament-heading" className="mx-auto max-w-7xl px-5 py-12 sm:px-10 lg:px-16">
      <h2 id="filament-heading" className="mb-6 text-3xl font-bold">Filament stock</h2>
      <Suspense fallback={<p role="status">Loading filament stock…</p>}>
        <StockList />
      </Suspense>
    </section>
  );
}
