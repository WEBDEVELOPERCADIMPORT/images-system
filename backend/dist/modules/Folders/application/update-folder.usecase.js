import AppError from "../../../shared/errors/AppError.js";
import { UniqueConstraintError } from "../../../shared/db/database/errors/UniqueConstraintError.js";
export class UpdateFolderUseCase {
    foldersRepository;
    createAuditLogUseCase;
    constructor(foldersRepository, createAuditLogUseCase) {
        this.foldersRepository = foldersRepository;
        this.createAuditLogUseCase = createAuditLogUseCase;
    }
    async execute(id, data, userId) {
        try {
            const existing = await this.foldersRepository.findById(id);
            if (!existing) {
                throw new AppError("Folder not found", "FOLDER_NOT_FOUND", 404);
            }
            let newParentId = existing.parentId;
            if (data.parentId !== undefined) {
                newParentId = data.parentId ? data.parentId : null;
                if (newParentId === id) {
                    throw new AppError("A folder cannot be its own parent", "FOLDER_CYCLE_DETECTED", 400);
                }
                if (newParentId !== null) {
                    const targetParent = await this.foldersRepository.findById(newParentId);
                    if (!targetParent) {
                        throw new AppError("Parent folder not found", "PARENT_FOLDER_NOT_FOUND", 404);
                    }
                    if (targetParent.brandId !== existing.brandId) {
                        throw new AppError("Parent folder belongs to a different brand", "PARENT_FOLDER_DIFFERENT_BRAND", 400);
                    }
                    // Check cycle: cannot move folder into any of its own descendants
                    const wouldCreateCycle = await this.foldersRepository.isDescendant(id, newParentId);
                    if (wouldCreateCycle) {
                        throw new AppError("Cannot move a folder into one of its subfolders", "FOLDER_CYCLE_DETECTED", 400);
                    }
                }
            }
            const targetName = data.name !== undefined ? data.name.trim() : existing.name;
            // If name or parentId changed, verify uniqueness
            if (targetName !== existing.name || newParentId !== existing.parentId) {
                const duplicate = await this.foldersRepository.findByNameAndParent(targetName, existing.brandId, newParentId);
                if (duplicate && duplicate.id !== id) {
                    throw new AppError("A folder with this name already exists in the destination", "FOLDER_NAME_TAKEN", 400);
                }
            }
            const updated = await this.foldersRepository.update(id, {
                name: data.name !== undefined ? targetName : undefined,
                description: data.description !== undefined ? (data.description ? data.description.trim() : null) : undefined,
                parentId: data.parentId !== undefined ? newParentId : undefined
            });
            await this.createAuditLogUseCase.execute({
                userId,
                action: 'UPDATE',
                resource: 'FOLDER',
                resourceId: updated.id,
                details: { previous: { name: existing.name, parentId: existing.parentId }, updated: { name: updated.name, parentId: updated.parentId } }
            }).catch(err => console.error("Failed to create audit log for folder update", err));
            return updated;
        }
        catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw new AppError("A folder with this name already exists in the destination", "FOLDER_NAME_TAKEN", 400);
            }
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error updating folder", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
//# sourceMappingURL=update-folder.usecase.js.map