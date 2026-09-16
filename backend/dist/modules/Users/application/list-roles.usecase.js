export class ListRolesUseCase {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute() {
        return this.usersRepository.findAllRoles();
    }
}
//# sourceMappingURL=list-roles.usecase.js.map