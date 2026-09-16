import { z } from 'zod';

export const folderFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'Folder name is required')
        .max(100, 'Maximum 100 characters'),
    description: z
        .string()
        .trim()
        .max(500, 'Maximum 500 characters')
        .optional()
        .nullable(),
    parentId: z
        .string()
        .uuid('Invalid parent folder ID')
        .optional()
        .nullable(),
});

export type FolderFormValues = z.infer<typeof folderFormSchema>;
