"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { registerChild } from "@/lib/actions";
import { registrationSchema } from "@/schemas";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, PartyPopper, CalendarDays, MapPin, DollarSign, Users, Mail, Bus } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const eventInfo = [
    { icon: CalendarDays, label: 'Horário', value: 'A ser definido. Fique atento!' },
    { icon: MapPin, label: 'Local', value: 'Dependências da Igreja Presbiteriana da Alvorada.' },
    { icon: DollarSign, label: 'Valor', value: 'Gratuito. Traga apenas sua alegria!' },
    { icon: Bus, label: 'Transporte', value: 'Não incluso.' },
    { icon: Users, label: 'Faixa Etária', value: 'Crianças de 2 a 17 anos.' },
    { icon: Mail, label: 'Contato', value: 'contato@mca.com' }
];

export function Registration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      childName: "",
      guardianName: "",
      guardianWhatsapp: "",
      hasDietaryRestriction: "nao",
      dietaryRestrictionDetails: "",
      consentInfo: false,
      consentSupervision: false,
    },
  });
  
  const hasRestriction = form.watch("hasDietaryRestriction");

  async function onSubmit(data: any) {
    setIsSubmitting(true);
    try {
      const result = await registerChild(data);
      if (result.success) {
        setIsSuccess(true);
      } else {
        toast({
          variant: "destructive",
          title: "Erro na Inscrição",
          description: result.error || "Ocorreu um erro. Tente novamente.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro Inesperado",
        description: "Não foi possível completar a inscrição. Por favor, tente mais tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
       <section id="registration" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container flex justify-center px-4 md:px-6">
          <Card className="w-full max-w-2xl text-center shadow-lg animate-in fade-in-50 zoom-in-95">
            <CardHeader>
              <div className="mx-auto bg-green-100 p-4 rounded-full w-fit">
                <PartyPopper className="h-12 w-12 text-green-600" />
              </div>
              <CardTitle className="text-3xl font-bold mt-4">Inscrição Realizada com Sucesso!</CardTitle>
              <CardDescription className="text-lg">
                A vaga da sua criança está garantida. Mal podemos esperar para vê-la no Sábado Total!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Você receberá mais informações em breve no WhatsApp cadastrado.</p>
              <Button asChild className="mt-6">
                <Link href="/">Voltar ao Início</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-3xl px-4">
        <Logo className="h-40 w-auto mb-8" />
        <Card className="w-full shadow-xl">
           <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tight">Inscrição Sábado Total</CardTitle>
            <CardDescription className="md:text-xl">
              Garanta sua vaga no nosso próximo encontro!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
             <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4">
                {eventInfo.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <item.icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div className="text-sm">
                            <span className="font-semibold">{item.label}: </span>
                            <span>{item.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Mantendo os campos do formulário original por enquanto */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold border-b pb-2">Dados da Criança</h3>
                  <FormField
                    control={form.control}
                    name="childName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo da Criança</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Outros campos do formulário original... */}
                </div>
                 <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Finalizar Inscrição"
                  )}
                </Button>
              </form>
            </Form>
        </CardContent>
        </Card>
    </div>
  );
}
