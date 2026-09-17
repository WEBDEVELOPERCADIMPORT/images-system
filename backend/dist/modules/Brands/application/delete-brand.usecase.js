import AppError from "../../../shared/errors/AppError.js";
export class DeleteBrandUseCase {
    brandsRepository;
    auditLogService;
    constructor(brandsRepository, auditLogService) {
        this.brandsRepository = brandsRepository;
        this.auditLogService = auditLogService;
    }
    async execute(id, context) {
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