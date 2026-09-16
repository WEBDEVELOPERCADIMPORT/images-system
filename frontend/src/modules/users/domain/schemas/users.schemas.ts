import { z } from 'zod';

export const createUserSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    passwordRaw: z
        .string()
        .min(8, 'Password must be at least 8 characters long'),
    firstName: z
        .string()
        .trim()
        .min(1, 'First name is required')
        .max(50, 'Maximum 50 characters'),
    lastName: z
        .string()
        .trim()
        .min(1, 'Last name is required')
        .max(50, 'Maximum 50 characters'),
    roles: z
        .array(z.string())
        .min(1, 'Please select at least one role for the user'),
});

export const updateUserSchema = z.object({
    email: z
        .string()
        .trim()
        .email('Please enter a valid email address')
        .optional()
        .or(z.literal('')),
    passwordRaw: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .optional()
        .or(z.literal('')),
    firstName: z
        .string()
        .trim()
        .min(1, 'First name cannot be empty')
        .max(50, 'Maximum 50 characters')
        .optional(),
    lastName: z
        .string()
        .trim()
        .min(1, 'Last name cannot be empty')
        .max(50, 'Maximum 50 characters')
        .optional(),
    roles: z
        .array(z.string())
        .min(1, 'Please select at least one role')
        .optional(),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
