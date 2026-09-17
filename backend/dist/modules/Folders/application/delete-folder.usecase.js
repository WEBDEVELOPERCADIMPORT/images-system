import AppError from "../../../shared/errors/AppError.js";
export class DeleteFolderUseCase {
    foldersRepository;
    auditLogService;
    constructor(foldersRepository, auditLogService) {
        this.foldersRepository = foldersRepository;
        this.auditLogService = auditLogService;
    }
    async execute(id, context) {
        try {
            const existing = await this.foldersRepository.findById(id);
            if (!existing) {
                throw new AppError("Folder not found", "FOLDER_NOT_FOUND", 404);
            }
            await this.foldersRepository.delete(id);
            await this.auditLogService.record({
                userId: context?.userId,
                action: 'DELETE',
                resource: 'folder',
                resourceId: id,
                context,
                details: {
                    deleted: {
                        id: existing.id,
                        name: existing.name,
                        brandId: existing.brandId,
                        parentId: existing.parentId,
                        description: existing.description
                    }
                }
            });
        }
        catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error deleting folder", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
//# sourceMappingURL=delete-folder.usecase.js.map