import { PrismaAuditRepository } from "./infrastructure/prisma-audit.repository.js";
import { AuditLogService } from "./application/audit-log.service.js";
import { CreateAuditLogUseCase } from "./application/create-audit-log.usecase.js";
import { ListAuditLogsUseCase } from "./application/list-audit-logs.usecase.js";
import { GetAuditLogByIdUseCase } from "./application/get-audit-log-by-id.usecase.js";
import { AuditController } from "./presentation/audit.controller.js";
export declare const auditRepository: PrismaAuditRepository;
export declare const auditLogService: AuditLogService;
export declare const createAuditLogUseCase: CreateAuditLogUseCase;
export declare const listAuditLogsUseCase: ListAuditLogsUseCase;
export declare const getAuditLogByIdUseCase: GetAuditLogByIdUseCase;
export declare const auditController: AuditController;
//# sourceMappingURL=audit.module.d.ts.map