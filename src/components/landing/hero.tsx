import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Logo } from "@/components/logo";

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

  return (
    <section className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center pt-16">
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
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center text-foreground space-y-6">
        <div className="flex justify-center">
           <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg">
             <Logo className="h-16 w-auto" />
           </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Sábado Total para Crianças
        </h1>
        <p className="max-w-[700px] mx-auto text-lg md:text-xl text-foreground/80">
          Um dia inesquecível de diversão, amizade e aprendizado para a garotada da MCA.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="#registration">Inscrever criança</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="#info">Ver Detalhes</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
