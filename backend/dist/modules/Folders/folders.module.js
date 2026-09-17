import { PrismaClient } from "@prisma/client";
import { PrismaFoldersRepository } from "./infrastructure/prisma-folders.repository.js";
import { CreateFolderUseCase } from "./application/create-folder.usecase.js";
import { ListFoldersUseCase } from "./application/list-folders.usecase.js";
import { GetFolderUseCase } from "./application/get-folder.usecase.js";
import { UpdateFolderUseCase } from "./application/update-folder.usecase.js";
import { DeleteFolderUseCase } from "./application/delete-folder.usecase.js";
import { FoldersController } from "./presentation/folders.controller.js";
import { brandsRepository } from "../Brands/brands.module.js";
import { auditLogService } from "../Audit/audit.module.js";
const prisma = new PrismaClient();
export const foldersRepository = new PrismaFoldersRepository(prisma);
export const createFolderUseCase = new CreateFolderUseCase(foldersRepository, brandsRepository, auditLogService);
export const listFoldersUseCase = new ListFoldersUseCase(foldersRepository);
export const getFolderUseCase = new GetFolderUseCase(foldersRepository);
export const updateFolderUseCase = new UpdateFolderUseCase(foldersRepository, auditLogService);
export const deleteFolderUseCase = new DeleteFolderUseCase(foldersRepository, auditLogService);
export const foldersController = new FoldersController(createFolderUseCase, listFoldersUseCase, getFolderUseCase, updateFolderUseCase, deleteFolderUseCase);
//# sourceMappingURL=folders.module.js.map