import { PrismaBrandsRepository } from "./infrastructure/prisma-brands.repository.js";
import { CreateBrandUseCase } from "./application/create-brand.usecase.js";
import { ListBrandsUseCase } from "./application/list-brands.usecase.js";
import { GetBrandUseCase } from "./application/get-brand.usecase.js";
import { UpdateBrandUseCase } from "./application/update-brand.usecase.js";
import { DeleteBrandUseCase } from "./application/delete-brand.usecase.js";
import { GetBrandStatsUseCase } from "./application/get-brand-stats.usecase.js";
import { BrandsController } from "./presentation/brands.controller.js";
export declare const brandsRepository: PrismaBrandsRepository;
export declare const createBrandUseCase: CreateBrandUseCase;
export declare const listBrandsUseCase: ListBrandsUseCase;
export declare const getBrandUseCase: GetBrandUseCase;
export declare const updateBrandUseCase: UpdateBrandUseCase;
export declare const deleteBrandUseCase: DeleteBrandUseCase;
export declare const getBrandStatsUseCase: GetBrandStatsUseCase;
export declare const brandsController: BrandsController;
//# sourceMappingURL=brands.module.d.ts.map