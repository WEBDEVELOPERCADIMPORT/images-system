import { Router } from "express";
import { auditController } from "../audit.module.js";
import { AuthMiddleware } from "@app/middleware/Auth.middleware.js";

const router = Router();
const authMiddleware = new AuthMiddleware();

// Protect the route so only authenticated users with audit:read permission can see logs
router.use(authMiddleware.routeProtect);
router.use(authMiddleware.checkPermissionSome(["audit:read", "audit_logs:read"]));

router.get("/", auditController.list);
router.get("/:id", auditController.getById);

export default router;

