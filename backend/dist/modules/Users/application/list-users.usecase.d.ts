import type { UsersRepository } from "../domain/users.repository.js";
import type { GetSimpleUser } from "../domain/user.entity.js";
export interface ListUsersParams {
    page?: number;
    limit?: number;
    q?: string;
}
export interface ListUsersResult {
    data: GetSimpleUser[];
    total: number;
}
export declare class ListUsersUseCase {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    execute(params?: ListUsersParams): Promise<ListUsersResult>;
}
//# sourceMappingURL=list-users.usecase.d.ts.map