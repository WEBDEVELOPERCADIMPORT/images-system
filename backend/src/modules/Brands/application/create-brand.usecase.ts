import type { BrandsRepository } from "../domain/brands.repository.js";
import type { CreateBrand, GetBrand } from "../domain/brand.entity.js";
import type { CreateAuditLogUseCase } from "../../Audit/application/create-audit-log.usecase.js";
import AppError from "@shared/errors/AppError.js";
import { UniqueConstraintError } from "@shared/db/database/errors/UniqueConstraintError.js";

export class CreateBrandUseCase {
    constructor(
        private readonly brandsRepository: BrandsRepository,
        private readonly createAuditLogUseCase: CreateAuditLogUseCase
    ) {}

    async execute(data: CreateBrand, userId?: string | null): Promise<GetBrand> {
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
