import OrderForm from "@/components/orderForm";

export default function Home() {
  return (
    <main lang="sv" className="mx-auto w-full max-w-lg px-6 py-12">
      <h1 className="mb-6 text-2xl font-semibold">Testorder</h1>
      <OrderForm />
    </main>
  );
}
