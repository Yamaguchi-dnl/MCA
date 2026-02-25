"use client";

import { useState, useMemo } from "react";
import type { Registration } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, Timestamp } from 'firebase/firestore';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const firestore = useFirestore();

  const registrationsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'registrations'), orderBy('submissionDate', 'desc'));
  }, [firestore]);

  const { data: snapshot, isLoading: loading, error } = useCollection(registrationsQuery);

  const registrations: Registration[] = useMemo(() => {
    if (!snapshot) return [];
    return snapshot.map(doc => {
      const data = doc as Omit<Registration, 'id'>;
      return {
        ...data,
        id: doc.id,
        birthDate: data.birthDate instanceof Timestamp ? data.birthDate.toDate() : new Date(data.birthDate),
        submissionDate: data.submissionDate instanceof Timestamp ? data.submissionDate.toDate() : new Date(data.submissionDate),
      };
    });
  }, [snapshot]);

  const filteredRegistrations = useMemo(() => {
    return registrations.filter(
      (reg) =>
        reg.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.guardianName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, registrations]);

  const getAge = (birthDate: Date) => {
    const diff = Date.now() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const handleExportCSV = () => {
    if (!registrations.length) return;

    const headers = [
      "ID",
      "Nome da Criança",
      "Data de Nascimento",
      "Idade",
      "Nome do Responsável",
      "WhatsApp do Responsável",
      "Turma",
      "Possui Restrição Alimentar",
      "Detalhes da Restrição",
      "Status Inscrição",
      "Status Pagamento",
      "Data de Inscrição",
    ];

    const csvRows = [headers.join(",")];

    registrations.forEach(reg => {
      const birthDate = reg.birthDate instanceof Date ? reg.birthDate.toLocaleDateString('pt-BR') : '';
      const submissionDate = reg.submissionDate instanceof Date ? reg.submissionDate.toLocaleString('pt-BR') : '';
      const age = reg.birthDate instanceof Date ? getAge(reg.birthDate as Date) : '';

      const rowData = [
        reg.id,
        reg.childName,
        birthDate,
        age,
        reg.guardianName,
        reg.guardianWhatsapp,
        reg.ageGroup,
        reg.hasDietaryRestriction,
        reg.dietaryRestrictionDetails || '',
        reg.status,
        reg.paymentStatus,
        submissionDate,
      ];
      
      const row = rowData.map(value => {
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      }).join(',');

      csvRows.push(row);
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([`\uFEFF${csvString}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "inscricoes.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportXML = () => {
    if (!registrations.length) return;

    const escapeXml = (unsafe: string | undefined) => {
        if (typeof unsafe !== 'string') return '';
        return unsafe.replace(/[<>&'"]/g, function (c) {
            switch (c) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case '\'': return '&apos;';
                case '"': return '&quot;';
            }
            return c;
        });
    };

    let xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n<registrations>\n';

    registrations.forEach(reg => {
      const birthDate = reg.birthDate instanceof Date ? reg.birthDate.toLocaleDateString('pt-BR') : '';
      const submissionDate = reg.submissionDate instanceof Date ? reg.submissionDate.toLocaleString('pt-BR') : '';
      const age = reg.birthDate instanceof Date ? getAge(reg.birthDate as Date) : '';

      xmlString += '  <registration>\n';
      xmlString += `    <id>${reg.id}</id>\n`;
      xmlString += `    <childName>${escapeXml(reg.childName)}</childName>\n`;
      xmlString += `    <birthDate>${birthDate}</birthDate>\n`;
      xmlString += `    <age>${age}</age>\n`;
      xmlString += `    <guardianName>${escapeXml(reg.guardianName)}</guardianName>\n`;
      xmlString += `    <guardianWhatsapp>${escapeXml(reg.guardianWhatsapp)}</guardianWhatsapp>\n`;
      xmlString += `    <ageGroup>${escapeXml(reg.ageGroup)}</ageGroup>\n`;
      xmlString += `    <hasDietaryRestriction>${escapeXml(reg.hasDietaryRestriction)}</hasDietaryRestriction>\n`;
      xmlString += `    <dietaryRestrictionDetails>${escapeXml(reg.dietaryRestrictionDetails)}</dietaryRestrictionDetails>\n`;
      xmlString += `    <status>${escapeXml(reg.status)}</status>\n`;
      xmlString += `    <paymentStatus>${escapeXml(reg.paymentStatus)}</paymentStatus>\n`;
      xmlString += `    <submissionDate>${submissionDate}</submissionDate>\n`;
      xmlString += '  </registration>\n';
    });

    xmlString += '</registrations>';

    const blob = new Blob([xmlString], { type: "application/xml;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "inscricoes.xml");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusVariant = (status: Registration['status']) => {
    switch (status) {
      case 'confirmado':
        return 'bg-green-600';
      case 'pendente':
        return 'bg-yellow-500';
      case 'cancelado':
        return 'bg-red-600';
      default:
        return 'bg-gray-500';
    }
  }

  const getPaymentStatusVariant = (status: Registration['paymentStatus']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-600';
      case 'pending_payment':
        return 'bg-yellow-500';
      case 'waived':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  }

  if (error) {
    console.error("Firestore error:", error);
    return <p className="text-red-500 text-center">Erro ao carregar as inscrições. Por favor, tente recarregar a página.</p>;
  }

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="animate-in fade-in-50 duration-500">
          <CardHeader className="pb-2">
            <CardDescription>Total de Inscrições</CardDescription>
            {loading ? <Skeleton className="h-10 w-16" /> : <CardTitle className="text-4xl">{registrations.length}</CardTitle>}
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Dados atualizados em tempo real
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="animate-in fade-in-50 delay-200 duration-500">
        <CardHeader>
          <CardTitle>Inscrições Realizadas</CardTitle>
          <CardDescription>
            Uma lista de todas as crianças inscritas no evento.
          </CardDescription>
          <div className="pt-4 flex flex-wrap justify-between items-center gap-4">
            <Input
              placeholder="Pesquisar por nome da criança ou responsável..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
             <div className="flex gap-2">
              <Button onClick={handleExportCSV} variant="outline" size="sm" disabled={loading || registrations.length === 0}>
                <FileDown className="mr-2 h-4 w-4" />
                Exportar CSV
              </Button>
              <Button onClick={handleExportXML} variant="outline" size="sm" disabled={loading || registrations.length === 0}>
                <FileDown className="mr-2 h-4 w-4" />
                Exportar XML
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Criança</TableHead>
                  <TableHead className="hidden sm:table-cell">Responsável</TableHead>
                  <TableHead className="hidden md:table-cell">Turma</TableHead>
                  <TableHead className="hidden lg:table-cell">Inscrição</TableHead>
                  <TableHead className="text-right">Pagamento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                      <TableCell className="hidden sm:table-cell"><Skeleton className="h-5 w-32" /></TableCell>
                      <TableCell className="hidden md:table-cell"><Skeleton className="h-5 w-24" /></TableCell>
                      <TableCell className="hidden lg:table-cell"><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-6 w-20 rounded-full ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredRegistrations.length > 0 ? (
                  filteredRegistrations.map((reg) => (
                    <TableRow key={reg.id} className="animate-in fade-in-50">
                      <TableCell>
                        <div className="font-medium">{reg.childName}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {getAge(reg.birthDate as Date)} anos
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="font-medium">{reg.guardianName}</div>
                        <div className="text-sm text-muted-foreground">{reg.guardianWhatsapp}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{reg.ageGroup}</TableCell>
                       <TableCell className="hidden lg:table-cell">
                        <Badge variant="default" className={cn("text-white", getStatusVariant(reg.status))}>
                          {reg.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="default" className={cn("text-white", getPaymentStatusVariant(reg.paymentStatus))}>
                          {reg.paymentStatus === 'paid' ? 'Pago' : reg.paymentStatus === 'waived' ? 'Isento' : 'Pendente'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Nenhuma inscrição encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
