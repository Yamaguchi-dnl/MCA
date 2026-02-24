import { z } from "zod";
import { subYears, isAfter, isBefore } from "date-fns";

const today = new Date();
const minAgeDate = subYears(today, 18); // Must be born after this date (not yet 18)
const maxAgeDate = subYears(today, 2);  // Must be born before this date (at least 2)

export const registrationSchema = z.object({
  childName: z.string().min(3, { message: "O nome completo da criança é obrigatório." }),
  birthDate: z.date({ required_error: "A data de nascimento é obrigatória." })
    .refine(date => isAfter(date, minAgeDate), { message: "A idade máxima é 17 anos." })
    .refine(date => isBefore(date, maxAgeDate), { message: "A idade mínima é 2 anos." }),
  guardianName: z.string().min(3, { message: "O nome completo do responsável é obrigatório." }),
  guardianWhatsapp: z.string().min(10, { message: "O telefone (WhatsApp) do responsável é obrigatório." }),
  hasDietaryRestriction: z.enum(["sim", "nao"], {
    required_error: "Informe se a criança tem alguma restrição alimentar.",
  }),
  dietaryRestrictionDetails: z.string().optional(),
  ageGroup: z.enum([
    'Maternal', 
    'Jardim', 
    'Primários', 
    'Juniores', 
    'Adolescentes I', 
    'Adolescentes II'
  ], {
    required_error: "Selecione a turma da criança.",
  }),
}).refine(data => {
    if (data.hasDietaryRestriction === 'sim') {
        return data.dietaryRestrictionDetails && data.dietaryRestrictionDetails.trim().length > 0;
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
