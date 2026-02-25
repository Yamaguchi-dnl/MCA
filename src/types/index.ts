import type { z } from 'zod';
import type { registrationSchema } from '@/schemas';
import type { Timestamp } from 'firebase/firestore';

// This derives the type from the Zod schema for form validation
export type RegistrationSchema = z.infer<typeof registrationSchema>;

// This is the main type for a registration record as stored in Firestore and used in the app
export type Registration = Omit<RegistrationSchema, 'birthDate'> & {
  id: string;
  birthDate: Date | Timestamp;
  status: 'confirmado' | 'pendente' | 'cancelado';
  paymentStatus: 'pending_payment' | 'paid' | 'waived';
  submissionDate: Date | Timestamp;
};
