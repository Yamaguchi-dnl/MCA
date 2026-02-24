"use client";

import { useState } from "react";
import type { Registration } from "@/types";
import { getDietarySummary } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Loader2, Salad } from "lucide-react";
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type DietarySummaryProps = {
  registrations: Registration[];
};

export function DietarySummary({ registrations }: DietarySummaryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const { toast } = useToast();

  const handleSummarize = async () => {
    setIsLoading(true);
    setIsOpen(true);

    const restrictions = registrations
      .filter((reg) => reg.hasDietaryRestriction === "sim" && reg.dietaryRestrictionDetails)
      .map((reg) => reg.dietaryRestrictionDetails as string);

    try {
      const result = await getDietarySummary(restrictions);
      if (result.success) {
        setSummary(result.summary || "Nenhuma informação para resumir.");
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao Gerar Resumo",
          description: result.error,
        });
        setIsOpen(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro Inesperado",
        description: "Não foi possível gerar o resumo.",
      });
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  const restrictionCount = registrations.filter(r => r.hasDietaryRestriction === 'sim').length;

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
            <CardDescription>Resumo Alimentar (IA)</CardDescription>
            <CardTitle className="text-4xl">{restrictionCount}</CardTitle>
        </CardHeader>
        <CardContent>
            <Button size="sm" onClick={handleSummarize} disabled={isLoading}>
                <Sparkles className="mr-2 h-4 w-4" />
                Gerar Resumo
            </Button>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Salad className="h-6 w-6 text-primary"/>
              Resumo de Restrições Alimentares
            </DialogTitle>
            <DialogDescription>
              Resumo gerado por IA com base nas informações de inscrição. Use como um guia para o planejamento das refeições.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-4 text-muted-foreground">Analisando dados e gerando resumo...</p>
              </div>
            ) : (
              <ScrollArea className="h-64">
                <div className="prose prose-sm dark:prose-invert max-w-none rounded-md border p-4 bg-muted/50">
                   <p className="whitespace-pre-wrap">{summary}</p>
                </div>
              </ScrollArea>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
