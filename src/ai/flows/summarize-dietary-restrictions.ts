'use server';
/**
 * @fileOverview This file defines a Genkit flow to summarize dietary restrictions.
 *
 * - summarizeDietaryRestrictions - A function that handles the summarization of dietary restrictions.
 * - SummarizeDietaryRestrictionsInput - The input type for the summarizeDietaryRestrictions function.
 * - SummarizeDietaryRestrictionsOutput - The return type for the summarizeDietaryRestrictions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SummarizeDietaryRestrictionsInputSchema = z
  .object({
    restrictions: z
      .array(z.string())
      .describe(
        'A list of individual dietary restrictions reported by attendees.'
      ),
  })
  .describe('Input for summarizing dietary restrictions.');

export type SummarizeDietaryRestrictionsInput = z.infer<
  typeof SummarizeDietaryRestrictionsInputSchema
>;

const SummarizeDietaryRestrictionsOutputSchema = z
  .object({
    summary: z
      .string()
      .describe(
        'A concise summary of all dietary restrictions, highlighting commonalities and critical notes.'
      ),
  })
  .describe('Output containing the summarized dietary restrictions.');

export type SummarizeDietaryRestrictionsOutput = z.infer<
  typeof SummarizeDietaryRestrictionsOutputSchema
>;

export async function summarizeDietaryRestrictions(
  input: SummarizeDietaryRestrictionsInput
): Promise<SummarizeDietaryRestrictionsOutput> {
  return summarizeDietaryRestrictionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeDietaryRestrictionsPrompt',
  input: { schema: SummarizeDietaryRestrictionsInputSchema },
  output: { schema: SummarizeDietaryRestrictionsOutputSchema },
  prompt: `You are an AI assistant tasked with summarizing dietary restrictions for an event.
  Given a list of dietary restrictions from multiple attendees, provide a concise summary that highlights common restrictions, significant allergies, and any special meal preparations required.
  If there are no restrictions, state that clearly.

  Dietary Restrictions:
  {{#if restrictions}}
    {{#each restrictions}}
    - {{{this}}}
    {{/each}}
  {{else}}
    No dietary restrictions reported.
  {{/if}}`,
});

const summarizeDietaryRestrictionsFlow = ai.defineFlow(
  {
    name: 'summarizeDietaryRestrictionsFlow',
    inputSchema: SummarizeDietaryRestrictionsInputSchema,
    outputSchema: SummarizeDietaryRestrictionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate summary.');
    }
    return output;
  }
);
