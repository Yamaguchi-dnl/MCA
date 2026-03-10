"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export function Registration() {
  return (
    <div className="w-full max-w-3xl space-y-10 py-12 text-center flex flex-col items-center">
        <div className="animate-in fade-in-50 duration-700">
            <Link href="/" aria-label="Voltar para a página inicial">
                <Logo className="w-64 h-auto sm:h-72 sm:w-auto mx-auto -mb-16" />
            </Link>
        </div>

        <div className="mt-16 bg-destructive/90 p-6 sm:p-8 rounded-lg shadow-lg border-2 border-destructive-foreground animate-in fade-in-50 delay-100 duration-700">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-wider text-destructive-foreground">
                INSCRIÇÕES ENCERRADAS
            </h1>
            <p className="mt-4 text-lg text-destructive-foreground/90">
                Agradecemos o seu interesse! As vagas para este evento já foram preenchidas.
            </p>
        </div>

        <Button asChild variant="secondary" className="mt-8 animate-in fade-in-50 delay-200 duration-700">
            <Link href="/">Voltar para a Página Inicial</Link>
        </Button>
    </div>
  );
}
