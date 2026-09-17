import type { Request, Response } from 'express';
import type { AuditContext } from '../modules/Audit/domain/audit-log.entity.js';
declare abstract class BaseController {
    constructor();
    /**
     * Returns the context or environment of the current request.
     * Centralizes the security of business data.
     */
    protected obtenerEntorno(res: Response): any;
    /**
     * Extracts audit context cleanly from Express Request & Response
     * without passing Express objects to Use Cases.
     */
    protected getAuditContext(req: Request, res?: Response): AuditContext;
}
export default BaseController;
//# sourceMappingURL=base.controller.d.ts.map