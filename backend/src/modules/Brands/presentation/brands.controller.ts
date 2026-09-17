import type { Request, Response, NextFunction } from "express";
import ResponseHttp from "@app/http/response.http.js";
import BaseController from "@presentation/base.controller.js";
import type { CreateBrandUseCase } from "../application/create-brand.usecase.js";
import type { ListBrandsUseCase } from "../application/list-brands.usecase.js";
import type { GetBrandUseCase } from "../application/get-brand.usecase.js";
import type { UpdateBrandUseCase } from "../application/update-brand.usecase.js";
import type { DeleteBrandUseCase } from "../application/delete-brand.usecase.js";
import type { GetBrandStatsUseCase } from "../application/get-brand-stats.usecase.js";
import type { GetBrand } from "../domain/brand.entity.js";

export class BrandsController extends BaseController {
    constructor(
        private readonly createBrandUseCase: CreateBrandUseCase,
        private readonly listBrandsUseCase: ListBrandsUseCase,
        private readonly getBrandUseCase: GetBrandUseCase,
        private readonly updateBrandUseCase: UpdateBrandUseCase,
        private readonly deleteBrandUseCase: DeleteBrandUseCase,
        private readonly getBrandStatsUseCase: GetBrandStatsUseCase
    ) {
        super();
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const auditContext = this.getAuditContext(req, res);
            const brand = await this.createBrandUseCase.execute(data, auditContext);
            return res.status(201).json(ResponseHttp.success("Brand created successfully", brand));
        } catch (error) {
            next(error);
        }
    };

    list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const all = req.query.all === "true";
            if (all) {
                const brands = await this.listBrandsUseCase.execute({ all: true });
                return res.status(200).json(ResponseHttp.success("Brands fetched successfully", brands));
            }

            const page = req.query.page ? Math.max(1, parseInt(req.query.page as string, 10)) : 1;
            const limit = req.query.limit ? Math.max(1, parseInt(req.query.limit as string, 10)) : 10;
            const q = req.query.q ? String(req.query.q) : undefined;
            const offset = (page - 1) * limit;

            const result = await this.listBrandsUseCase.execute({ page, limit, q }) as { data: GetBrand[]; total: number };
            return res.status(200).json(ResponseHttp.pagination("Brands fetched successfully", result.data, result.total, limit, offset));
        } catch (error) {
            next(error);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as string;
            const brand = await this.getBrandUseCase.execute(id);
            return res.status(200).json(ResponseHttp.success("Brand fetched successfully", brand));
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as string;
            const data = req.body;
            const auditContext = this.getAuditContext(req, res);
            const brand = await this.updateBrandUseCase.execute(id, data, auditContext);
            return res.status(200).json(ResponseHttp.success("Brand updated successfully", brand));
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as string;
            const auditContext = this.getAuditContext(req, res);
            await this.deleteBrandUseCase.execute(id, auditContext);
            return res.status(200).json(ResponseHttp.success("Brand deleted successfully", null));
        } catch (error) {
            next(error);
        }
    };


    stats = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const stats = await this.getBrandStatsUseCase.execute();
            return res.status(200).json(ResponseHttp.success("Brand stats fetched successfully", stats));
        } catch (error) {
            next(error);
        }
    };
}
