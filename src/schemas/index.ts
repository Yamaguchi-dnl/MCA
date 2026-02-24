import { z } from "zod";
import { subYears, isAfter, isBefore, parse, isValid } from "date-fns";

export const registrationSchema = z.object({
  childName: z.string().min(3, { message: "O nome completo do participante é obrigatório." }),
  birthDate: z.string()
    .min(10, { message: "A data de nascimento é obrigatória e deve estar no formato DD/MM/AAAA." })
    .refine(val => {
        const parsedDate = parse(val, 'dd/MM/yyyy', new Date());
        // check if date is valid and year is reasonable
        return isValid(parsedDate) && parsedDate.getFullYear() > 1900;
    }, {
        message: "Data de nascimento inválida."
    }),
  guardianName: z.string().min(3, { message: "O nome completo do responsável é obrigatório." }),
  guardianWhatsapp: z.string().min(10, { message: "O telefone (WhatsApp) do responsável é obrigatório." }),
  hasDietaryRestriction: z.enum(["sim", "nao"], {
    required_error: "Informe se há alguma restrição alimentar.",
  }),
  dietaryRestrictionDetails: z.string().optional(),
  ageGroup: z.enum([
    'Maternal', 
    'Jardim', 
    'Primários', 
    'Juniores', 
    'Adolescentes I', 
    'Adolescentes II',
    'Amigo'
  ], {
    required_error: "Selecione a turma ou opção.",
  }),
}).superRefine((data, ctx) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const minAgeDate = subYears(today, 18);
    const maxAgeDate = subYears(today, 2);
    
    if (data.ageGroup !== 'Amigo') {
        const birthDateAsDate = parse(data.birthDate, 'dd/MM/yyyy', new Date());
        if (!data.birthDate || !isValid(birthDateAsDate)) {
            // Already handled by initial validation, but good to have a check
            return;
        }
        if (isAfter(birthDateAsDate, maxAgeDate)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `A idade mínima para as turmas é 2 anos.`,
                path: ['birthDate'],
            });
        }
        if (isBefore(birthDateAsDate, minAgeDate)) {
             ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `A idade máxima para as turmas é 17 anos.`,
                path: ['birthDate'],
            });
        }
    }

    if (data.hasDietaryRestriction === 'sim') {
        if (!data.dietaryRestrictionDetails || data.dietaryRestrictionDetails.trim().length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Por favor, especifique a restrição alimentar.",
                path: ["dietaryRestrictionDetails"],
            });
        }
    }
});
