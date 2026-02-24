'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex h-screen flex-col items-center justify-center bg-background text-foreground">
          <div className="text-center">
            <h1 className="mb-4 text-6xl font-bold text-destructive">Erro!</h1>
            <p className="mb-4 text-xl">Oops! Algo deu errado.</p>
            <p className="mb-8 max-w-md text-muted-foreground">
              {error.message || 'Ocorreu um erro inesperado.'}
            </p>
            <Button onClick={() => reset()}>Tentar Novamente</Button>
          </div>
        </div>
      </body>
    </html>
  );
}
