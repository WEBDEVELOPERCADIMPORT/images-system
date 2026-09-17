import type { BrandsRepository } from "../domain/brands.repository.js";
import type { AuditLogService } from "../../Audit/application/audit-log.service.js";
import type { AuditContext } from "../../Audit/domain/audit-log.entity.js";
import AppError from "@shared/errors/AppError.js";

export class DeleteBrandUseCase {
    constructor(
        private readonly brandsRepository: BrandsRepository,
        private readonly auditLogService: AuditLogService
    ) {}

    async execute(id: string, context?: AuditContext): Promise<void> {
        try {
            const existing = await this.brandsRepository.findById(id);
            if (!existing) {
                throw new AppError("Brand not found", "BRAND_NOT_FOUND", 404);
            }

            await this.brandsRepository.delete(id);

            await this.auditLogService.record({
                userId: context?.userId,
                action: 'DELETE',
                resource: 'brand',
                resourceId: id,
                context,
                details: {
                    deleted: {
                        id: existing.id,
                        name: existing.name,
                        description: existing.description
                    }
                }
            });
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error deleting brand", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}

