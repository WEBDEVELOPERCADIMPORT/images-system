import { PrismaClient } from "@prisma/client";
import { PrismaBrandsRepository } from "./infrastructure/prisma-brands.repository.js";
import { CreateBrandUseCase } from "./application/create-brand.usecase.js";
import { ListBrandsUseCase } from "./application/list-brands.usecase.js";
import { GetBrandUseCase } from "./application/get-brand.usecase.js";
import { UpdateBrandUseCase } from "./application/update-brand.usecase.js";
import { DeleteBrandUseCase } from "./application/delete-brand.usecase.js";
import { GetBrandStatsUseCase } from "./application/get-brand-stats.usecase.js";
import { BrandsController } from "./presentation/brands.controller.js";
import { auditLogService } from "../Audit/audit.module.js";

const prisma = new PrismaClient();

export const brandsRepository = new PrismaBrandsRepository(prisma);

export const createBrandUseCase = new CreateBrandUseCase(brandsRepository, auditLogService);
export const listBrandsUseCase = new ListBrandsUseCase(brandsRepository);
export const getBrandUseCase = new GetBrandUseCase(brandsRepository);
export const updateBrandUseCase = new UpdateBrandUseCase(brandsRepository, auditLogService);
export const deleteBrandUseCase = new DeleteBrandUseCase(brandsRepository, auditLogService);
export const getBrandStatsUseCase = new GetBrandStatsUseCase(brandsRepository);


export const brandsController = new BrandsController(
    createBrandUseCase,
    listBrandsUseCase,
    getBrandUseCase,
    updateBrandUseCase,
    deleteBrandUseCase,
    getBrandStatsUseCase
);
