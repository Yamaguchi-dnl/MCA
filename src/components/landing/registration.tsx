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
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, PartyPopper, CalendarDays, MapPin, DollarSign, Users, Info } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IMaskInput } from "react-imask";
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
      birthDate: "",
      guardianName: "",
      guardianWhatsapp: "",
      hasDietaryRestriction: "nao",
      dietaryRestrictionDetails: "",
      ageGroup: undefined,
    },
  });
  
  const hasRestriction = form.watch("hasDietaryRestriction");
  const ageGroupOptions = [
    { value: 'Maternal', label: 'Maternal' },
    { value: 'Jardim', label: 'Jardim' },
    { value: 'Primários', label: 'Primários' },
    { value: 'Juniores', label: 'Juniores' },
    { value: 'Adolescentes I', label: 'Adolescentes I' },
    { value: 'Adolescentes II', label: 'Adolescentes II' },
    { value: 'Amigo', label: 'Sou um(a) amigo(a)' },
  ];

  async function onSubmit(data: any) {
    setIsSubmitting(true);
    try {
      const result = await registerChild(data);
      if (result.success) {
        setIsSuccess(true);
        window.scrollTo(0, 0);
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
       <div className="w-full max-w-2xl text-center">
          <Card className="w-full shadow-lg animate-in fade-in-50 zoom-in-95">
            <CardHeader className="items-center">
              <div className="mx-auto bg-green-100 dark:bg-green-900/50 p-4 rounded-full w-fit">
                <PartyPopper className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-3xl font-bold mt-4">Inscrição Realizada com Sucesso!</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Sua vaga está garantida. Mal podemos esperar para te ver no Sábado Total!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Você receberá mais informações em breve no WhatsApp cadastrado.</p>
              <Button asChild className="mt-6 font-semibold">
                <Link href="/">Voltar para a Página Inicial</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
    );
  }

  return (
    <div className="w-full max-w-3xl space-y-10">
        <div className="text-center pt-8 sm:pt-4">
            <Link href="/" aria-label="Voltar para a página inicial">
                <Logo className="h-72 w-auto mx-auto -mb-16" />
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4">Ficha de Inscrição</h1>
            <p className="mt-2 text-lg text-muted-foreground">
                Preencha os dados abaixo com atenção para garantir a vaga.
            </p>
        </div>

        <Card className="overflow-hidden shadow-sm">
            <CardHeader className="bg-muted/50">
                <CardTitle>Detalhes do Evento</CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {eventInfo.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-full mt-1">
                            <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-semibold text-card-foreground">{item.label}</p>
                            <p className="text-muted-foreground">{item.value}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            
            <fieldset className="space-y-6 rounded-lg border p-6 shadow-sm bg-card">
                <legend className="-ml-1 px-1 text-xl font-semibold">1. Dados do Participante</legend>
                <FormField
                    control={form.control}
                    name="childName"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                        <Input placeholder="Nome completo do participante" {...field} />
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
                        <FormControl>
                          <IMaskInput
                            mask="00/00/0000"
                            placeholder="DD/MM/AAAA"
                            value={field.value || ""}
                            onAccept={(value: any) => {
                              field.onChange(value);
                            }}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </fieldset>

            <fieldset className="space-y-6 rounded-lg border p-6 shadow-sm bg-card">
                <legend className="-ml-1 px-1 text-xl font-semibold">2. Dados do Responsável</legend>
                <FormField
                    control={form.control}
                    name="guardianName"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nome Completo do Responsável</FormLabel>
                        <FormControl>
                        <Input placeholder="Seu nome completo" {...field} />
                        </FormControl>
                        <FormDescription>Pessoa que está preenchendo a ficha (pode ser você mesmo).</FormDescription>
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
                        <FormDescription>Usaremos para enviar informações importantes sobre o evento.</FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </fieldset>

            <fieldset className="space-y-6 rounded-lg border p-6 shadow-sm bg-card">
                <legend className="-ml-1 px-1 text-xl font-semibold">3. Informações Adicionais</legend>
                <FormField
                    control={form.control}
                    name="ageGroup"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Turma / Opção</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Selecione a turma ou opção" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {ageGroupOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                        <FormDescription>Selecione a turma da criança ou a opção "Sou um(a) amigo(a)" se for o caso.</FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="hasDietaryRestriction"
                    render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel>Possui alguma restrição alimentar ou alergia?</FormLabel>
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
                            placeholder="Ex: Alergia a amendoim, intolerância à lactose, etc."
                            className="resize-none"
                            {...field}
                            />
                        </FormControl>
                        <FormDescription>Esta informação é crucial para a sua segurança.</FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                )}
            </fieldset>
            
            <Alert variant="default" className="bg-secondary/10 border-secondary/50 text-secondary-foreground">
                <Info className="h-4 w-4 !text-secondary" />
                <AlertTitle className="text-secondary">Aviso Importante</AlertTitle>
                <AlertDescription className="text-muted-foreground">
                Crianças de 2 e 3 anos (turma Maternal) precisam estar acompanhadas por um adulto responsável durante todo o evento.
                </AlertDescription>
            </Alert>

            <Button type="submit" className="w-full font-bold text-lg py-7" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Enviando Inscrição...
                </>
                ) : (
                "FINALIZAR INSCRIÇÃO"
                )}
            </Button>
            </form>
        </Form>
    </div>
  );
}
