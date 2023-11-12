import { z } from 'zod';

export const createRecipeSchema = z.object({
    title: z.string({
        required_error: "El título es requerido"
    }),
    description: z.string({
        required_error: "La descripción es requerida"
    }).optional(),
    date: z.string().datetime().optional()
})

export const updateRecipeSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    date: z.string().datetime().optional()
})