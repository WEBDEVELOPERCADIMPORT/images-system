import ResponseHttp from "../../../app/http/response.http.js";
import BaseController from "../../../presentation/base.controller.js";
export class BrandsController extends BaseController {
    createBrandUseCase;
    listBrandsUseCase;
    getBrandUseCase;
    updateBrandUseCase;
    deleteBrandUseCase;
    getBrandStatsUseCase;
    constructor(createBrandUseCase, listBrandsUseCase, getBrandUseCase, updateBrandUseCase, deleteBrandUseCase, getBrandStatsUseCase) {
        super();
        this.createBrandUseCase = createBrandUseCase;
        this.listBrandsUseCase = listBrandsUseCase;
        this.getBrandUseCase = getBrandUseCase;
        this.updateBrandUseCase = updateBrandUseCase;
        this.deleteBrandUseCase = deleteBrandUseCase;
        this.getBrandStatsUseCase = getBrandStatsUseCase;
    }
    create = async (req, res, next) => {
        try {
            const data = req.body;
            const auditContext = this.getAuditContext(req, res);
            const brand = await this.createBrandUseCase.execute(data, auditContext);
            return res.status(201).json(ResponseHttp.success("Brand created successfully", brand));
        }
        catch (error) {
            next(error);
        }
    };
    list = async (req, res, next) => {
        try {
            const all = req.query.all === "true";
            if (all) {
                const brands = await this.listBrandsUseCase.execute({ all: true });
                return res.status(200).json(ResponseHttp.success("Brands fetched successfully", brands));
            }
            const page = req.query.page ? Math.max(1, parseInt(req.query.page, 10)) : 1;
            const limit = req.query.limit ? Math.max(1, parseInt(req.query.limit, 10)) : 10;
            const q = req.query.q ? String(req.query.q) : undefined;
            const offset = (page - 1) * limit;
            const result = await this.listBrandsUseCase.execute({ page, limit, q });
            return res.status(200).json(ResponseHttp.pagination("Brands fetched successfully", result.data, result.total, limit, offset));
        }
        catch (error) {
            next(error);
        }
    };
    getById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const brand = await this.getBrandUseCase.execute(id);
            return res.status(200).json(ResponseHttp.success("Brand fetched successfully", brand));
        }
        catch (error) {
            next(error);
        }
    };
    update = async (req, res, next) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const auditContext = this.getAuditContext(req, res);
            const brand = await this.updateBrandUseCase.execute(id, data, auditContext);
            return res.status(200).json(ResponseHttp.success("Brand updated successfully", brand));
        }
        catch (error) {
            next(error);
        }
    };
    delete = async (req, res, next) => {
        try {
            const id = req.params.id;
            const auditContext = this.getAuditContext(req, res);
            await this.deleteBrandUseCase.execute(id, auditContext);
            return res.status(200).json(ResponseHttp.success("Brand deleted successfully", null));
        }
        catch (error) {
            next(error);
        }
    };
    stats = async (req, res, next) => {
        try {
            const stats = await this.getBrandStatsUseCase.execute();
            return res.status(200).json(ResponseHttp.success("Brand stats fetched successfully", stats));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=brands.controller.js.map