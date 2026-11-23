import NavBar from "@/components/navBar";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div>
      <div>
      <NavBar />

      <main lang="sv" className="mx-auto w-full max-w-[80%] pt-20">
        <Hero />
      </main>
      </div>
    </div>
  );
}
