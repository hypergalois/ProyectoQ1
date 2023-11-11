import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error: 'El nombre de usuario es requerido'
    }),
    email: z.string({
        required_error: 'El correo electrónico es requerido'
    }),
    password: z.string({
        required_error: 'La contraseña es requerida'
    }).min(6, 'La contraseña debe tener al menos 6 caracteres'),
})