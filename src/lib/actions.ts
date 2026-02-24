"use server";

import { z } from "zod";
import { registrationSchema } from "@/schemas";
import { summarizeDietaryRestrictions } from "@/ai/flows/summarize-dietary-restrictions";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs, Timestamp } from "firebase/firestore";

type RegistrationResult = {
  success: boolean;
  error?: string;
};

export async function registerChild(
  data: z.infer<typeof registrationSchema>
): Promise<RegistrationResult> {
  const validatedFields = registrationSchema.safeParse(data);

  if (!validatedFields.success) {
    return { success: false, error: "Dados inválidos." };
  }
  
  const { birthDate, ...restData } = validatedFields.data;

  const registrationData = {
    ...restData,
    birthDate: Timestamp.fromDate(birthDate),
    status: 'confirmado',
    submissionDate: Timestamp.now(),
  };

  try {
    const inscricoesRef = collection(db, "inscricoes");
    const q = query(inscricoesRef, where("childName", "==", registrationData.childName));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return { success: false, error: "Esta criança já foi inscrita anteriormente." };
    }

    await addDoc(inscricoesRef, registrationData);
    
    return { success: true };

  } catch (error) {
    console.error("Error during registration:", error);
    return { success: false, error: "Ocorreu um erro no servidor. Tente novamente mais tarde." };
  }
}

type SummaryResult = {
    success: boolean;
    summary?: string;
    error?: string;
}

export async function getDietarySummary(restrictions: string[]): Promise<SummaryResult> {
    if (!restrictions || restrictions.length === 0) {
        return { success: true, summary: "Nenhuma restrição alimentar foi informada pelos participantes." };
    }

    try {
        const result = await summarizeDietaryRestrictions({ restrictions });
        return { success: true, summary: result.summary };
    } catch (error) {
        console.error("Error summarizing dietary restrictions:", error);
        return { success: false, error: "Falha ao gerar o resumo com a IA." };
    }
}
