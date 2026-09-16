import AppError from "../../../shared/errors/AppError.js";
export class ListUsersUseCase {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(params) {
        try {
            const page = params?.page && params.page > 0 ? Number(params.page) : 1;
            const limit = params?.limit && params.limit > 0 ? Number(params.limit) : 10;
            return await this.usersRepository.findAllPaginated(page, limit, { q: params?.q });
        }
        catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new AppError("Error fetching users", "INTERNAL_SERVER_ERROR", 500);
        }
    }
}
//# sourceMappingURL=list-users.usecase.js.map