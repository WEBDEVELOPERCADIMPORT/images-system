import { PrismaClient } from "@prisma/client";
import { PrismaAuditRepository } from "./infrastructure/prisma-audit.repository.js";
import { AuditLogService } from "./application/audit-log.service.js";
import { CreateAuditLogUseCase } from "./application/create-audit-log.usecase.js";
import { ListAuditLogsUseCase } from "./application/list-audit-logs.usecase.js";
import { GetAuditLogByIdUseCase } from "./application/get-audit-log-by-id.usecase.js";
import { AuditController } from "./presentation/audit.controller.js";

const prisma = new PrismaClient();

export const auditRepository = new PrismaAuditRepository(prisma);
export const auditLogService = new AuditLogService(auditRepository);

export const createAuditLogUseCase = new CreateAuditLogUseCase(auditLogService);
export const listAuditLogsUseCase = new ListAuditLogsUseCase(auditRepository);
export const getAuditLogByIdUseCase = new GetAuditLogByIdUseCase(auditRepository);

export const auditController = new AuditController(listAuditLogsUseCase, getAuditLogByIdUseCase);

