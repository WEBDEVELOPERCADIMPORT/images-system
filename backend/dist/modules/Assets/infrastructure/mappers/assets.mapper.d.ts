import type { Asset as PrismaAsset } from "@prisma/client";
import type { AssetEntity } from "../../domain/asset.entity.js";
type PrismaAssetFull = PrismaAsset & {
    brand?: {
        id: string;
        name: string;
    } | null;
    folder?: {
        id: string;
        name: string;
    } | null;
};
export declare class AssetsMapper {
    static toDomain(asset: PrismaAssetFull): AssetEntity;
}
export {};
//# sourceMappingURL=assets.mapper.d.ts.map