'use server';
/**
 * @fileOverview A Genkit flow for providing personalized dish recommendations.
 *
 * - recommendPersonalizedDishes - A function that generates personalized dish recommendations.
 * - RecommendPersonalizedDishesInput - The input type for the recommendPersonalizedDishes function.
 * - RecommendPersonalizedDishesOutput - The return type for the recommendPersonalizedDishes function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RecommendPersonalizedDishesInputSchema = z.object({
  pastOrders: z.array(z.string()).describe('A list of dishes previously ordered by the user.'),
  dietaryPreferences: z.array(z.string()).describe('A list of the user\'s dietary preferences (e.g., "vegetarian", "gluten-free", "spicy").'),
});
export type RecommendPersonalizedDishesInput = z.infer<typeof RecommendPersonalizedDishesInputSchema>;

const RecommendedDishSchema = z.object({
  dishName: z.string().describe('The name of the recommended dish.'),
  description: z.string().describe('A short description of the recommended dish.'),
  reason: z.string().describe('A brief explanation why this dish is recommended based on user preferences and past orders.'),
});

const RecommendPersonalizedDishesOutputSchema = z.object({
  recommendations: z.array(RecommendedDishSchema).describe('A list of personalized dish recommendations.'),
});
export type RecommendPersonalizedDishesOutput = z.infer<typeof RecommendPersonalizedDishesOutputSchema>;

export async function recommendPersonalizedDishes(input: RecommendPersonalizedDishesInput): Promise<RecommendPersonalizedDishesOutput> {
  return recommendPersonalizedDishesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendPersonalizedDishesPrompt',
  input: { schema: RecommendPersonalizedDishesInputSchema },
  output: { schema: RecommendPersonalizedDishesOutputSchema },
  prompt: `You are an AI assistant for Foodly King, an online food store. Your task is to provide personalized dish recommendations to a user based on their past orders and dietary preferences.
Consider the user's past orders to understand their taste profile and dietary preferences for any restrictions or specific requirements.
Provide 3-5 unique and appealing dish recommendations. Each recommendation should include a dish name, a short description, and a brief reason for the recommendation.

Past Orders:
{{#if pastOrders}}
  {{#each pastOrders}}
    - {{{this}}}
  {{/each}}
{{else}}
  No past orders provided.
{{/if}}

Dietary Preferences:
{{#if dietaryPreferences}}
  {{#each dietaryPreferences}}
    - {{{this}}}
  {{/each}}
{{else}}
  No specific dietary preferences provided.
{{/if}}

Please format your response as a JSON object matching the 'RecommendPersonalizedDishesOutputSchema' schema.`,
});

const recommendPersonalizedDishesFlow = ai.defineFlow(
  {
    name: 'recommendPersonalizedDishesFlow',
    inputSchema: RecommendPersonalizedDishesInputSchema,
    outputSchema: RecommendPersonalizedDishesOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
