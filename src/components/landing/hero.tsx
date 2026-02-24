import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Logo } from "@/components/logo";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center text-center">
      <div className="absolute inset-0 z-0">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-white flex flex-col items-center">
        <Logo className="h-40 w-auto" />
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mt-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
          Sábado Total - Na Trilha da Fé
        </h1>
        <p className="max-w-2xl mx-auto mt-4 md:text-xl text-lg font-light" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
          Um dia inesquecível de diversão, aprendizado e amizade para crianças e adolescentes.
        </p>
        <div className="flex justify-center mt-8">
          <Button asChild size="lg" className="text-lg px-10 py-7 rounded-full font-bold shadow-lg transform transition-transform hover:scale-105">
            <Link href="/inscricao">FAZER INSCRIÇÃO AGORA</Link>
          </Button>
        </div>
         <a href="#info" className="absolute bottom-8 animate-bounce">
            <ArrowDown className="h-8 w-8" />
            <span className="sr-only">Rolar para detalhes</span>
        </a>
      </div>
    </section>
  );
}
