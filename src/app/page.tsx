import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Info } from "@/components/landing/info";

export default function Home() {
  return (
    <main className="bg-background">
      <Hero />
      <Info />
      <Footer />
    </main>
  );
}
