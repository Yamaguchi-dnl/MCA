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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Loader2, PartyPopper } from "lucide-react";
import Link from "next/link";

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const ageGroups = [
  "Maternal (2-3 anos)",
  "Jardim (4-5 anos)",
  "1º ao 5º ano (6-10 anos)",
  "6º ao 9º ano (11-14 anos)",
  "Ensino Médio (15-17 anos)",
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

  async function onSubmit(data: RegistrationFormValues) {
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
    <section id="registration" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6">
        <Card className="w-full max-w-3xl mx-auto shadow-xl">
           <CardHeader className="text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Formulário de Inscrição</h2>
            <p className="text-muted-foreground md:text-xl">
              Garanta a vaga da sua criança. O preenchimento leva apenas alguns minutos.
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                     <FormField
                      control={form.control}
                      name="ageGroup"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Turma / Faixa Etária</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione a turma" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {ageGroups.map(group => (
                                <SelectItem key={group} value={group}>{group}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold border-b pb-2">Dados do Responsável</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="guardianName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo do Responsável</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome do responsável" {...field} />
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
                          <FormLabel>WhatsApp (com DDD)</FormLabel>
                          <FormControl>
                            <Input placeholder="(99) 99999-9999" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold border-b pb-2">Informações de Saúde</h3>
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
                  {hasRestriction === 'sim' && (
                    <FormField
                      control={form.control}
                      name="dietaryRestrictionDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Por favor, especifique as restrições alimentares ou alergias:</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Ex: Alergia a amendoim, intolerância à lactose, etc."
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
                 
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold border-b pb-2">Termos e Consentimento</h3>
                  <FormField
                    control={form.control}
                    name="consentInfo"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                             Estou ciente de todas as informações do evento (data, horário, local).
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="consentSupervision"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                           Concordo que, para crianças menores de 4 anos, um responsável permanecerá durante todo o evento.
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
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
    </section>
  );
}
