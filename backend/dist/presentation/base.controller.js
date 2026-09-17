import AppError from '../shared/errors/AppError.js';
class BaseController {
    constructor() { }
    /**
     * Returns the context or environment of the current request.
     * Centralizes the security of business data.
     */
    obtenerEntorno(res) {
        if (!res.locals.user) {
            throw new AppError("Unable to determine the context of the request", "CONTEXT_NOT_FOUND", 403);
        }
        return res.locals.user;
    }
    /**
     * Extracts audit context cleanly from Express Request & Response
     * without passing Express objects to Use Cases.
     */
    getAuditContext(req, res) {
        const user = res?.locals?.user || req.user;
        const forwarded = req.headers['x-forwarded-for'];
        const ip = typeof forwarded === 'string'
            ? forwarded.split(',')[0]?.trim() || undefined
            : req.socket?.remoteAddress || req.ip || undefined;
        const userAgent = req.headers['user-agent'];
        return {
            userId: user?.id || null,
            ip,
            userAgent,
            method: req.method,
            path: req.originalUrl || req.path
        };
    }
}
export default BaseController;
//# sourceMappingURL=base.controller.js.map