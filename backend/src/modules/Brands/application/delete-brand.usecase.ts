import type { BrandsRepository } from "../domain/brands.repository.js";
import type { CreateAuditLogUseCase } from "../../Audit/application/create-audit-log.usecase.js";
import AppError from "@shared/errors/AppError.js";

export class DeleteBrandUseCase {
    constructor(
        private readonly brandsRepository: BrandsRepository,
        private readonly createAuditLogUseCase: CreateAuditLogUseCase
    ) {}

    async execute(id: string, userId?: string | null): Promise<void> {
        try {
            const existing = await this.brandsRepository.findById(id);
            if (!existing) {
                throw new AppError("Brand not found", "BRAND_NOT_FOUND", 404);
            }

            await this.brandsRepository.delete(id);

            await this.createAuditLogUseCase.execute({
                userId,
                action: 'DELETE',
                resource: 'BRAND',
                resourceId: id,
                details: { name: existing.name }
            }).catch(err => console.error("Failed to create audit log for brand delete", err));
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error deleting brand", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
