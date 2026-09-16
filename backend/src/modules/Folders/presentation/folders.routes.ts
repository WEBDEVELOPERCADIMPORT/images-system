import { Router } from "express";
import { foldersController } from "../folders.module.js";
import { AuthMiddleware } from "@app/middleware/Auth.middleware.js";
import { ValidatedMiddleware } from "@app/middleware/Validated.middleware.js";
import { CreateFolderSchema, UpdateFolderSchema, FolderIdSchema } from "./validators/folders.schemas.js";

const router = Router();
const authMiddleware = new AuthMiddleware();
const validatedMiddleware = new ValidatedMiddleware();

// Protect all folder routes - require authentication
router.use(authMiddleware.routeProtect);

router.get("/", foldersController.list);
router.get("/:id", validatedMiddleware.validateParams(FolderIdSchema), foldersController.getById);
router.post("/", validatedMiddleware.validateBody(CreateFolderSchema), foldersController.create);
router.put("/:id", validatedMiddleware.validateParams(FolderIdSchema), validatedMiddleware.validateBody(UpdateFolderSchema), foldersController.update);
router.delete("/:id", validatedMiddleware.validateParams(FolderIdSchema), foldersController.delete);

export default router;
