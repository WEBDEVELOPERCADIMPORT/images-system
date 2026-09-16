import AppError from "../../../shared/errors/AppError.js";
export class GetFolderUseCase {
    foldersRepository;
    constructor(foldersRepository) {
        this.foldersRepository = foldersRepository;
    }
    async execute(id) {
        try {
            const folder = await this.foldersRepository.findById(id);
            if (!folder) {
                throw new AppError("Folder not found", "FOLDER_NOT_FOUND", 404);
            }
            const breadcrumbs = await this.foldersRepository.getBreadcrumbs(id);
            return {
                ...folder,
                breadcrumbs
            };
        }
        catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error fetching folder", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
//# sourceMappingURL=get-folder.usecase.js.map