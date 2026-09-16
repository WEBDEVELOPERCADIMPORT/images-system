import { z } from "zod";
export const CreateBrandSchema = z.object({
    name: z.string().trim().min(1, "El nombre de la marca es requerido").max(100, "Máximo 100 caracteres"),
    description: z.string().trim().max(500, "Máximo 500 caracteres").optional().nullable()
});
export const UpdateBrandSchema = z.object({
    name: z.string().trim().min(1, "El nombre de la marca no puede estar vacío").max(100, "Máximo 100 caracteres").optional(),
    description: z.string().trim().max(500, "Máximo 500 caracteres").optional().nullable()
});
export const BrandIdSchema = z.object({
    id: z.string().uuid("Formato de ID de marca inválido")
});
//# sourceMappingURL=brands.schemas.js.map