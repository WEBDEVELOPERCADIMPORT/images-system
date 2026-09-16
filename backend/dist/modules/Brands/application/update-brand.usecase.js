import AppError from "../../../shared/errors/AppError.js";
import { UniqueConstraintError } from "../../../shared/db/database/errors/UniqueConstraintError.js";
export class UpdateBrandUseCase {
    brandsRepository;
    createAuditLogUseCase;
    constructor(brandsRepository, createAuditLogUseCase) {
        this.brandsRepository = brandsRepository;
        this.createAuditLogUseCase = createAuditLogUseCase;
    }
    async execute(id, data, userId) {
        try {
            const existing = await this.brandsRepository.findById(id);
            if (!existing) {
                throw new AppError("Brand not found", "BRAND_NOT_FOUND", 404);
            }
            if (data.name && data.name.trim() !== existing.name) {
                const nameTaken = await this.brandsRepository.findByName(data.name.trim());
                if (nameTaken && nameTaken.id !== id) {
                    throw new AppError("A brand with this name already exists", "BRAND_NAME_TAKEN", 400);
                }
            }
            const updatedBrand = await this.brandsRepository.update(id, {
                name: data.name ? data.name.trim() : undefined,
                description: data.description !== undefined ? (data.description ? data.description.trim() : null) : undefined
            });
            await this.createAuditLogUseCase.execute({
                userId,
                action: 'UPDATE',
                resource: 'BRAND',
                resourceId: updatedBrand.id,
                details: { previous: { name: existing.name }, updated: { name: updatedBrand.name } }
            }).catch(err => console.error("Failed to create audit log for brand update", err));
            return updatedBrand;
        }
        catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw new AppError("A brand with this name already exists", "BRAND_NAME_TAKEN", 400);
            }
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error updating brand", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
//# sourceMappingURL=update-brand.usecase.js.map