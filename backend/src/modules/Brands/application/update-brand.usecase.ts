import type { BrandsRepository } from "../domain/brands.repository.js";
import type { UpdateBrand, GetBrand } from "../domain/brand.entity.js";
import type { AuditLogService } from "../../Audit/application/audit-log.service.js";
import type { AuditContext } from "../../Audit/domain/audit-log.entity.js";
import AppError from "@shared/errors/AppError.js";
import { UniqueConstraintError } from "@shared/db/database/errors/UniqueConstraintError.js";

export class UpdateBrandUseCase {
    constructor(
        private readonly brandsRepository: BrandsRepository,
        private readonly auditLogService: AuditLogService
    ) {}

    async execute(id: string, data: UpdateBrand, context?: AuditContext): Promise<GetBrand> {
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

            await this.auditLogService.record({
                userId: context?.userId,
                action: 'UPDATE',
                resource: 'brand',
                resourceId: updatedBrand.id,
                context,
                before: {
                    name: existing.name,
                    description: existing.description
                },
                after: {
                    name: updatedBrand.name,
                    description: updatedBrand.description
                }
            });

            return updatedBrand;
        } catch (error) {
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

