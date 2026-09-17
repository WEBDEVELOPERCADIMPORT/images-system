import type { AuditLog, AuditAction } from "../../domain/audit-log.entity.js";

export class AuditMapper {
    static toDomain(log: any): AuditLog {
        return {
            id: log.id,
            userId: log.userId,
            action: log.action as AuditAction,
            resource: log.resource,
            resourceId: log.resourceId,
            details: log.details,
            createdAt: log.createdAt,
            user: log.user ? {
                id: log.user.id,
                firstName: log.user.firstName,
                lastName: log.user.lastName,
                email: log.user.email,
                avatarUrl: log.user.avatarUrl ?? null
            } : null
        };
    }
}

