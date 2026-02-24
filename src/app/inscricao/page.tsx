import { Info } from "@/components/landing/info";
import { Registration } from "@/components/landing/registration";
import { Footer } from "@/components/landing/footer";
import { Logo } from "@/components/logo";
import Link from "next/link";

export default function InscricaoPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
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
        <Info />
        <Registration />
      </main>
      <Footer />
    </div>
  );
}
