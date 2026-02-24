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
          <div className="pt-4">
            <Input
              placeholder="Pesquisar por nome da criança ou responsável..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
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
                  <TableHead className="hidden lg:table-cell">Restrições</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                      <TableCell className="hidden sm:table-cell"><Skeleton className="h-5 w-32" /></TableCell>
                      <TableCell className="hidden md:table-cell"><Skeleton className="h-5 w-24" /></TableCell>
                      <TableCell className="hidden lg:table-cell"><Skeleton className="h-5 w-28" /></TableCell>
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
                       <TableCell className="hidden lg:table-cell max-w-[200px] truncate">
                        {reg.hasDietaryRestriction === 'sim' ? reg.dietaryRestrictionDetails : 'N/A'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={reg.status === 'confirmado' ? 'default' : 'destructive'} className="bg-green-600 text-white">
                          {reg.status}
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
