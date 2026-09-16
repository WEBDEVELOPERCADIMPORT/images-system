import AppError from "../../../shared/errors/AppError.js";
export class DeleteBrandUseCase {
    brandsRepository;
    createAuditLogUseCase;
    constructor(brandsRepository, createAuditLogUseCase) {
        this.brandsRepository = brandsRepository;
        this.createAuditLogUseCase = createAuditLogUseCase;
    }
    async execute(id, userId) {
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
        }
        catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error deleting brand", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
//# sourceMappingURL=delete-brand.usecase.js.map