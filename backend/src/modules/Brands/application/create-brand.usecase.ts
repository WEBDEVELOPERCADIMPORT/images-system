import type { BrandsRepository } from "../domain/brands.repository.js";
import type { CreateBrand, GetBrand } from "../domain/brand.entity.js";
import type { AuditLogService } from "../../Audit/application/audit-log.service.js";
import type { AuditContext } from "../../Audit/domain/audit-log.entity.js";
import AppError from "@shared/errors/AppError.js";
import { UniqueConstraintError } from "@shared/db/database/errors/UniqueConstraintError.js";

export class CreateBrandUseCase {
    constructor(
        private readonly brandsRepository: BrandsRepository,
        private readonly auditLogService: AuditLogService
    ) {}

    async execute(data: CreateBrand, context?: AuditContext): Promise<GetBrand> {
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
        } catch (error) {
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

