import ResponseHttp from "../../../app/http/response.http.js";
import BaseController from "../../../presentation/base.controller.js";
export class AuditController extends BaseController {
    listAuditLogsUseCase;
    getAuditLogByIdUseCase;
    constructor(listAuditLogsUseCase, getAuditLogByIdUseCase) {
        super();
        this.listAuditLogsUseCase = listAuditLogsUseCase;
        this.getAuditLogByIdUseCase = getAuditLogByIdUseCase;
    }
    list = async (req, res, next) => {
        try {
            const page = req.query.page ? Math.max(1, parseInt(req.query.page, 10)) : 1;
            const limit = req.query.limit ? Math.max(1, parseInt(req.query.limit, 10)) : 10;
            const offset = (page - 1) * limit;
            const filters = {};
            if (req.query.action) {
                filters.action = req.query.action;
            }
            if (req.query.resource) {
                filters.resource = String(req.query.resource).toLowerCase().trim();
            }
            if (req.query.userId) {
                filters.userId = String(req.query.userId);
            }
            if (req.query.resourceId) {
                filters.resourceId = String(req.query.resourceId);
            }
            if (req.query.q) {
                filters.q = String(req.query.q);
            }
            if (req.query.dateFrom) {
                filters.dateFrom = String(req.query.dateFrom);
            }
            if (req.query.dateTo) {
                filters.dateTo = String(req.query.dateTo);
            }
            const { data, total } = await this.listAuditLogsUseCase.execute({
                page,
                limit,
                filters
            });
            return res.status(200).json(ResponseHttp.pagination("Audit logs fetched successfully", data, total, limit, offset));
        }
        catch (error) {
            next(error);
        }
    };
    getById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const log = await this.getAuditLogByIdUseCase.execute(id);
            return res.status(200).json(ResponseHttp.success("Audit log fetched successfully", log));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=audit.controller.js.map