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
import { Loader2, PartyPopper, CalendarDays, MapPin, DollarSign, Users, Info } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


type RegistrationFormValues = z.infer<typeof registrationSchema>;

const eventInfo = [
    { icon: CalendarDays, label: 'Data e Horário', value: '14/03 - logo após o culto até as 17h' },
    { icon: MapPin, label: 'Local', value: 'Igreja Adventista da Promessa da Barreirinha - Rua Flávio Dallegrave, 9745' },
    { icon: DollarSign, label: 'Valor', value: 'Gratuito' },
    { icon: Users, label: 'Faixa Etária', value: '2-17 anos' }
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
    },
  });
  
  const hasRestriction = form.watch("hasDietaryRestriction");
  const ageGroupOptions = [
    'Maternal', 
    'Jardim', 
    'Primários', 
    'Juniores', 
    'Adolescentes I', 
    'Adolescentes II'
  ];

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
            <CardTitle className="text-3xl font-bold tracking-tight">Sábado Total - Na trilha da Fé</CardTitle>
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
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold border-b pb-2">Dados da Criança</h3>
                  <FormField
                    control={form.control}
                    name="childName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome completo da criança" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Data de Nascimento</FormLabel>
                        <DatePicker field={field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold border-b pb-2">Dados do Responsável</h3>
                  <FormField
                    control={form.control}
                    name="guardianName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo do Responsável</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome de quem preenche" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="guardianWhatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone (WhatsApp) do Responsável</FormLabel>
                        <FormControl>
                          <Input placeholder="(99) 99999-9999" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold border-b pb-2">Informações Adicionais</h3>
                   <FormField
                    control={form.control}
                    name="ageGroup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Qual a turma do seu filho?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma turma" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ageGroupOptions.map(option => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hasDietaryRestriction"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Seu filho(a) tem alguma restrição alimentar?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex items-center space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="sim" />
                              </FormControl>
                              <FormLabel className="font-normal">Sim</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="nao" />
                              </FormControl>
                              <FormLabel className="font-normal">Não</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {hasRestriction === "sim" && (
                    <FormField
                      control={form.control}
                      name="dietaryRestrictionDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Se sim, qual?</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Ex: Alergia a amendoim, intolerância à lactose..."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Observação Importante</AlertTitle>
                  <AlertDescription>
                    Crianças de 2-3 anos precisam estar acompanhadas de um adulto responsável.
                  </AlertDescription>
                </Alert>

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
