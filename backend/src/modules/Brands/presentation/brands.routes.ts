import { Router } from "express";
import { brandsController } from "../brands.module.js";
import { AuthMiddleware } from "@app/middleware/Auth.middleware.js";
import { ValidatedMiddleware } from "@app/middleware/Validated.middleware.js";
import { CreateBrandSchema, UpdateBrandSchema, BrandIdSchema } from "./validators/brands.schemas.js";

const router = Router();
const authMiddleware = new AuthMiddleware();
const validatedMiddleware = new ValidatedMiddleware();

// Protect all brand routes - require authentication
router.use(authMiddleware.routeProtect);

router.get("/stats", brandsController.stats);
router.get("/", brandsController.list);
router.get("/:id", validatedMiddleware.validateParams(BrandIdSchema), brandsController.getById);
router.post("/", validatedMiddleware.validateBody(CreateBrandSchema), brandsController.create);
router.put("/:id", validatedMiddleware.validateParams(BrandIdSchema), validatedMiddleware.validateBody(UpdateBrandSchema), brandsController.update);
router.delete("/:id", validatedMiddleware.validateParams(BrandIdSchema), brandsController.delete);

export default router;
