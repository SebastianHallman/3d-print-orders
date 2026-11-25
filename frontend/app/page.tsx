import NavBar from "@/components/navBar";
import Hero from "@/components/hero";
import FilamentInventory from "@/components/filamentInventory";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <FilamentInventory />
      </main>
    </>
  );
}
