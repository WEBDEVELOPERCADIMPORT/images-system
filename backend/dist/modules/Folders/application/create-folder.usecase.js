import AppError from "../../../shared/errors/AppError.js";
import { UniqueConstraintError } from "../../../shared/db/database/errors/UniqueConstraintError.js";
export class CreateFolderUseCase {
    foldersRepository;
    brandsRepository;
    createAuditLogUseCase;
    constructor(foldersRepository, brandsRepository, createAuditLogUseCase) {
        this.foldersRepository = foldersRepository;
        this.brandsRepository = brandsRepository;
        this.createAuditLogUseCase = createAuditLogUseCase;
    }
    async execute(data, userId) {
        try {
            // Validate Brand exists
            const brand = await this.brandsRepository.findById(data.brandId);
            if (!brand) {
                throw new AppError("The specified brand does not exist", "BRAND_NOT_FOUND", 404);
            }
            const parentId = data.parentId ? data.parentId : null;
            // If parentId is specified, validate it exists and belongs to same brand
            if (parentId) {
                const parentFolder = await this.foldersRepository.findById(parentId);
                if (!parentFolder) {
                    throw new AppError("Parent folder not found", "PARENT_FOLDER_NOT_FOUND", 404);
                }
                if (parentFolder.brandId !== data.brandId) {
                    throw new AppError("Parent folder belongs to a different brand", "PARENT_FOLDER_DIFFERENT_BRAND", 400);
                }
            }
            // Check duplicate name in same parent
            const trimmedName = data.name.trim();
            const existingFolder = await this.foldersRepository.findByNameAndParent(trimmedName, data.brandId, parentId);
            if (existingFolder) {
                throw new AppError("A folder with this name already exists in this directory", "FOLDER_NAME_TAKEN", 400);
            }
            const folder = await this.foldersRepository.create({
                name: trimmedName,
                description: data.description?.trim() || null,
                brandId: data.brandId,
                parentId
            });
            await this.createAuditLogUseCase.execute({
                userId,
                action: 'CREATE',
                resource: 'FOLDER',
                resourceId: folder.id,
                details: { name: folder.name, brandId: folder.brandId, parentId: folder.parentId }
            }).catch(err => console.error("Failed to create audit log for folder create", err));
            return folder;
        }
        catch (error) {
            if (error instanceof UniqueConstraintError) {
                throw new AppError("A folder with this name already exists in this directory", "FOLDER_NAME_TAKEN", 400);
            }
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error creating folder", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
//# sourceMappingURL=create-folder.usecase.js.map