import { z } from 'zod';

export const brandFormSchema = z.object({
    name: z
        .string({ required_error: 'Brand name is required' })
        .trim()
        .min(1, 'Brand name is required')
        .max(100, 'Maximum 100 characters'),
    description: z
        .string()
        .trim()
        .max(500, 'Maximum 500 characters')
        .optional()
        .nullable(),
});

export type BrandFormValues = {
    name: string;
    description?: string | null;
};
