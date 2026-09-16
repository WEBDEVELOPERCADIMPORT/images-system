import AppError from "../../../shared/errors/AppError.js";
import { UniqueConstraintError } from "../../../shared/db/database/errors/UniqueConstraintError.js";
export class CreateBrandUseCase {
    brandsRepository;
    createAuditLogUseCase;
    constructor(brandsRepository, createAuditLogUseCase) {
        this.brandsRepository = brandsRepository;
        this.createAuditLogUseCase = createAuditLogUseCase;
    }
    async execute(data, userId) {
        try {
            const existing = await this.brandsRepository.findByName(data.name.trim());
            if (existing) {
                throw new AppError("A brand with this name already exists", "BRAND_NAME_TAKEN", 400);
            }
            const brand = await this.brandsRepository.create({
                name: data.name.trim(),
                description: data.description?.trim() || null
            });
            await this.createAuditLogUseCase.execute({
                userId,
                action: 'CREATE',
                resource: 'BRAND',
                resourceId: brand.id,
                details: { name: brand.name }
            }).catch(err => console.error("Failed to create audit log for brand create", err));
            return brand;
        }
        catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw new AppError("A brand with this name already exists", "BRAND_NAME_TAKEN", 400);
            }
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error creating brand", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
//# sourceMappingURL=create-brand.usecase.js.map