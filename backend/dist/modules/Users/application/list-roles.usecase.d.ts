import type { UsersRepository } from "../domain/users.repository.js";
export interface RoleResponse {
    id: string;
    name: string;
    description: string | null;
}
export declare class ListRolesUseCase {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    execute(): Promise<RoleResponse[]>;
}
//# sourceMappingURL=list-roles.usecase.d.ts.map