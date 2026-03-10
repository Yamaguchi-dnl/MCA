import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Logo } from "@/components/logo";

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

  return (
    <main className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover animate-in fade-in zoom-in-105 duration-1500 ease-out"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-white flex flex-col items-center">
        <div className="animate-in fade-in zoom-in-95 duration-1000 ease-out">
          <Logo className="w-96 h-auto sm:w-auto -mb-12 sm:-mb-8" />
        </div>
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out delay-200">
            <div className="bg-destructive/90 p-4 sm:p-6 rounded-lg shadow-lg border-2 border-destructive-foreground">
                <h2 className="text-2xl sm:text-4xl font-bold tracking-wider text-destructive-foreground">
                    INSCRIÇÕES ENCERRADAS
                </h2>
            </div>
        </div>
      </div>
    </main>
  );
}
