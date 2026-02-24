import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarDays, MapPin, Users, Info as InfoIcon, DollarSign } from "lucide-react";

const infoItems = [
  {
    icon: CalendarDays,
    title: "Data e Hora",
    content: "A ser definido. Fique atento!",
  },
  {
    icon: MapPin,
    title: "Localização",
    content: "Dependências da Igreja Presbiteriana da Alvorada.",
  },
  {
    icon: DollarSign,
    title: "Valor",
    content: "Gratuito. Traga apenas sua alegria!",
  },
  {
    icon: Users,
    title: "Faixa Etária",
    content: "Crianças de 2 a 17 anos.",
  },
];

const supervisionNotice = {
    icon: InfoIcon,
    title: "Aviso Importante sobre Supervisão",
    content: "Crianças menores de 4 anos devem estar acompanhadas por um responsável durante todo o evento para garantir sua segurança e bem-estar. Agradecemos a compreensão."
}

export function Info() {
  return (
    <section id="info" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Detalhes do Evento</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Tudo o que você precisa saber para participar do nosso Sábado Total.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
          {infoItems.map((item, index) => (
            <Card key={index} className="text-center shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="bg-primary/10 p-3 rounded-full">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mx-auto max-w-5xl mt-12">
            <Card className="bg-secondary/10 border-secondary shadow-md">
                <CardHeader className="flex flex-row items-center gap-4">
                     <div className="bg-secondary/10 p-3 rounded-full">
                        <supervisionNotice.icon className="h-8 w-8 text-secondary" />
                    </div>
                    <div>
                        <CardTitle>{supervisionNotice.title}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-secondary-foreground/80">{supervisionNotice.content}</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
