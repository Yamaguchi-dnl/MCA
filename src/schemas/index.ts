import { z } from "zod";
import { subYears, isAfter, isBefore } from "date-fns";

const today = new Date();
const minAgeDate = subYears(today, 18); // Must be born after this date (not yet 18)
const maxAgeDate = subYears(today, 2);  // Must be born before this date (at least 2)

export const registrationSchema = z.object({
  childName: z.string().min(3, { message: "O nome completo é obrigatório." }),
  birthDate: z.date({ required_error: "A data de nascimento é obrigatória." })
    .refine(date => isAfter(date, minAgeDate), { message: "A idade máxima é 17 anos." })
    .refine(date => isBefore(date, maxAgeDate), { message: "A idade mínima é 2 anos." }),
  ageGroup: z.string({ required_error: "Selecione uma turma." }),
  guardianName: z.string().min(3, { message: "O nome do responsável é obrigatório." }),
  guardianWhatsapp: z.string().regex(/^\(\d{2}\)\s\d{5}-\d{4}$/, { message: "Formato de WhatsApp inválido. Use (99) 99999-9999." }),
  hasDietaryRestriction: z.enum(["sim", "nao"]),
  dietaryRestrictionDetails: z.string().optional(),
  consentInfo: z.literal(true, {
    errorMap: () => ({ message: "Você deve estar ciente das informações." }),
  }),
  consentSupervision: z.literal(true, {
    errorMap: () => ({ message: "Você deve concordar com o termo de supervisão." }),
  }),
}).refine(data => {
    if (data.hasDietaryRestriction === 'sim') {
        return data.dietaryRestrictionDetails && data.dietaryRestrictionDetails.length > 0;
    }
    return true;
}, {
    message: "Por favor, especifique a restrição alimentar.",
    path: ["dietaryRestrictionDetails"],
});

export type Registration = z.infer<typeof registrationSchema> & {
    id: string;
    status: 'confirmado' | 'pendente' | 'cancelado';
    submissionDate: Date;
};
