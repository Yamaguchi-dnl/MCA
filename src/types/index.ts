import type { z } from 'zod';
import type { registrationSchema } from '@/schemas';
import type { Timestamp } from 'firebase/firestore';

// This derives the type from the Zod schema
export type RegistrationSchema = z.infer<typeof registrationSchema>;

// This is the main type for a registration record, including server-generated fields
export type Registration = Omit<RegistrationSchema, 'birthDate' | 'submissionDate'> & {
  id: string;
  birthDate: Date | Timestamp;
  status: 'confirmado' | 'pendente' | 'cancelado';
  submissionDate: Date | Timestamp;
};
