import type { Request, Response, NextFunction } from "express";
import BaseController from "../../../presentation/base.controller.js";
import type { CreateBrandUseCase } from "../application/create-brand.usecase.js";
import type { ListBrandsUseCase } from "../application/list-brands.usecase.js";
import type { GetBrandUseCase } from "../application/get-brand.usecase.js";
import type { UpdateBrandUseCase } from "../application/update-brand.usecase.js";
import type { DeleteBrandUseCase } from "../application/delete-brand.usecase.js";
import type { GetBrandStatsUseCase } from "../application/get-brand-stats.usecase.js";
export declare class BrandsController extends BaseController {
    private readonly createBrandUseCase;
    private readonly listBrandsUseCase;
    private readonly getBrandUseCase;
    private readonly updateBrandUseCase;
    private readonly deleteBrandUseCase;
    private readonly getBrandStatsUseCase;
    constructor(createBrandUseCase: CreateBrandUseCase, listBrandsUseCase: ListBrandsUseCase, getBrandUseCase: GetBrandUseCase, updateBrandUseCase: UpdateBrandUseCase, deleteBrandUseCase: DeleteBrandUseCase, getBrandStatsUseCase: GetBrandStatsUseCase);
    create: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    list: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getById: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    update: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    delete: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    stats: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=brands.controller.d.ts.map