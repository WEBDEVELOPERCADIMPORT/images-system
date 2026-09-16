import AppError from "../../../shared/errors/AppError.js";
export class DeleteFolderUseCase {
    foldersRepository;
    createAuditLogUseCase;
    constructor(foldersRepository, createAuditLogUseCase) {
        this.foldersRepository = foldersRepository;
        this.createAuditLogUseCase = createAuditLogUseCase;
    }
    async execute(id, userId) {
        try {
            const existing = await this.foldersRepository.findById(id);
            if (!existing) {
                throw new AppError("Folder not found", "FOLDER_NOT_FOUND", 404);
            }
            await this.foldersRepository.delete(id);
            await this.createAuditLogUseCase.execute({
                userId,
                action: 'DELETE',
                resource: 'FOLDER',
                resourceId: id,
                details: { name: existing.name, brandId: existing.brandId }
            }).catch(err => console.error("Failed to create audit log for folder delete", err));
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