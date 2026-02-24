"use server";

import { z } from "zod";
import { registrationSchema } from "@/schemas";
import { summarizeDietaryRestrictions } from "@/ai/flows/summarize-dietary-restrictions";
// To fully enable Firestore, you'll need to uncomment the following lines
// and set up your Firebase project in `src/lib/firebase.ts`.
// import { db } from "@/lib/firebase";
// import { collection, addDoc, query, where, getDocs, Timestamp } from "firebase/firestore";

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
  
  const registrationData = {
    ...validatedFields.data,
    status: 'confirmado',
    submissionDate: new Date(),
  };

  try {
    // --- Firestore Integration (currently commented out) ---
    // This is where you would check for duplicates and save the new registration.
    
    // 1. Check for duplicate registration by child's name
    // const inscricoesRef = collection(db, "inscricoes");
    // const q = query(inscricoesRef, where("childName", "==", registrationData.childName));
    // const querySnapshot = await getDocs(q);
    
    // if (!querySnapshot.empty) {
    //   return { success: false, error: "Esta criança já foi inscrita anteriormente." };
    // }

    // 2. Add the new registration document
    // await addDoc(inscricoesRef, {
    //     ...registrationData,
    //     birthDate: Timestamp.fromDate(registrationData.birthDate),
    //     submissionDate: Timestamp.fromDate(registrationData.submissionDate),
    // });
    
    // --- End of Firestore Integration ---
    
    // Simulate a network delay for demonstration purposes.
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real application, the success depends on the Firestore operation above.
    // For now, we assume it's always successful if validation passes.
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
