import type { User, CreateUser, UpdateUser, GetUser, GetSimpleUser } from "./user.entity.js";
export interface UsersRepository {
    create(data: CreateUser): Promise<GetUser>;
    update(id: string, data: UpdateUser): Promise<GetUser>;
    findById(id: string): Promise<GetUser | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<GetSimpleUser[]>;
    findAllPaginated(page: number, limit: number, filters?: {
        q?: string;
    }): Promise<{
        data: GetSimpleUser[];
        total: number;
    }>;
    findAllRoles(): Promise<{
        id: string;
        name: string;
        description: string | null;
    }[]>;
    disable(id: string): Promise<GetUser>;
    softDelete(id: string): Promise<GetUser>;
}
//# sourceMappingURL=users.repository.d.ts.map