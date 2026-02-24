import type { z } from 'zod';
import type { registrationSchema } from '@/schemas';

// This derives the type from the Zod schema
export type RegistrationSchema = z.infer<typeof registrationSchema>;

// This is the main type for a registration record, including server-generated fields
export type Registration = RegistrationSchema & {
  id: string;
  status: 'confirmado' | 'pendente' | 'cancelado';
  submissionDate: Date | { seconds: number; nanoseconds: number; }; // Supports Date and Firestore Timestamp
};
