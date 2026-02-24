import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Logo } from "@/components/logo";

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

  return (
    <section className="relative w-full h-screen flex items-center justify-center">
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
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center text-foreground space-y-8">
        <div className="flex justify-center">
           <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg">
             <Logo className="h-20 w-auto" />
           </div>
        </div>
        <div className="flex justify-center">
          <Button asChild size="lg" className="text-lg px-10 py-6">
            <Link href="/inscricao">FAZER INSCRIÇÃO</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
