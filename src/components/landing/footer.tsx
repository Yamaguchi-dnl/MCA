import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-muted p-6 md:py-8 w-full">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
           <Logo className="h-8 w-auto" />
        </div>
        <p className="text-sm text-muted-foreground text-center md:text-right">
          &copy; {currentYear} Sábado Total MCA. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
