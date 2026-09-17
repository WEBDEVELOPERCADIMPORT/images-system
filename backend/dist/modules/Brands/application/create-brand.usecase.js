import AppError from "../../../shared/errors/AppError.js";
import { UniqueConstraintError } from "../../../shared/db/database/errors/UniqueConstraintError.js";
export class CreateBrandUseCase {
    brandsRepository;
    auditLogService;
    constructor(brandsRepository, auditLogService) {
        this.brandsRepository = brandsRepository;
        this.auditLogService = auditLogService;
    }
    async execute(data, context) {
        try {
            const existing = await this.brandsRepository.findByName(data.name.trim());
            if (existing) {
                throw new AppError("A brand with this name already exists", "BRAND_NAME_TAKEN", 400);
            }
            const brand = await this.brandsRepository.create({
                name: data.name.trim(),
                description: data.description?.trim() || null
            });
            await this.auditLogService.record({
                userId: context?.userId,
                action: 'CREATE',
                resource: 'brand',
                resourceId: brand.id,
                context,
                details: {
                    name: brand.name,
                    description: brand.description
                }
            });
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