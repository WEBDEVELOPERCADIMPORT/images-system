import type { Request, Response, NextFunction } from "express";
import type { ListAuditLogsUseCase } from "../application/list-audit-logs.usecase.js";
import type { GetAuditLogByIdUseCase } from "../application/get-audit-log-by-id.usecase.js";
import BaseController from "../../../presentation/base.controller.js";
export declare class AuditController extends BaseController {
    private readonly listAuditLogsUseCase;
    private readonly getAuditLogByIdUseCase;
    constructor(listAuditLogsUseCase: ListAuditLogsUseCase, getAuditLogByIdUseCase: GetAuditLogByIdUseCase);
    list: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getById: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=audit.controller.d.ts.map