export class UsersMapper {
    static toDomain(user) {
        return {
            id: user.id,
            email: user.email,
            passwordHash: user.passwordHash,
            firstName: user.firstName,
            lastName: user.lastName,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }
    static toGetUser(user) {
        const roles = user.userRoles?.map((ur) => ur.role?.name || ur.role).filter(Boolean) || [];
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isActive: user.isActive,
            roles,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }
    static toGetSimpleUser(user) {
        const roles = user.userRoles?.map((ur) => ur.role?.name || ur.role).filter(Boolean) || [];
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isActive: user.isActive,
            roles
        };
    }
}
//# sourceMappingURL=users.mapper.js.map