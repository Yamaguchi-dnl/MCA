import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Logo } from "@/components/logo";

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

  return (
    <main className="relative w-full h-screen flex items-center justify-center text-center">
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
        <Logo className="h-80 w-auto" />
        <div className="flex justify-center mt-8">
          <Button asChild size="lg" className="text-lg rounded-full font-bold shadow-lg transform transition-transform hover:scale-105">
            <Link href="/inscricao">FAZER INSCRIÇÃO AGORA</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
