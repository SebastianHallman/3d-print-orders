import OrderForm from "./orderForm";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-cocoa bg-[url('/img/koksverkstaden-hero.webp')] bg-cover bg-position-[18%_center] md:bg-left"
    >
      <div className="bg-linear-to-b from-black/75 via-black/30 to-transparent md:bg-linear-to-r">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-12 sm:px-10 md:grid-cols-2 md:py-20 lg:px-16">
          <div className="text-cream">
            <h1 id="hero-heading" className="max-w-[12ch] text-5xl font-bold tracking-tight lg:text-7xl">
              Need that thing? Sebbe fix
            </h1>
            <p className="mt-4 text-xl">Make him run that printer</p>
          </div>
          <div className="w-full min-w-0 max-w-md rounded-3xl bg-background p-6 text-foreground shadow-2xl sm:p-8 md:justify-self-end">
            <OrderForm />
          </div>
        </div>
      </div>
    </section>
  );
}
