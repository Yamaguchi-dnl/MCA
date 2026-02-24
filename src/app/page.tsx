import { Hero } from "@/components/landing/hero";
import { Info } from "@/components/landing/info";
import { Registration } from "@/components/landing/registration";
import { Footer } from "@/components/landing/footer";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Logo className="h-8 w-auto" />
          <span className="sr-only">Sábado Total MCA</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/admin" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Admin
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <Hero />
        <Info />
        <Registration />
      </main>
      <Footer />
    </div>
  );
}
