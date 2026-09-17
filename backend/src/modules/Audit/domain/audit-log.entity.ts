export type AuditAction = 'LOGIN' | 'LOGOUT' | 'CREATE' | 'UPDATE' | 'DELETE';

export interface AuditUserSummary {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string | null;
}

export interface AuditLog {
    id: string;
    userId: string | null;
    action: AuditAction;
    resource: string;
    resourceId: string | null;
    details: any | null;
    createdAt: Date;
    user?: AuditUserSummary | null;
}

export interface CreateAuditLog {
    userId?: string | null;
    action: AuditAction;
    resource: string;
    resourceId?: string | null;
    details?: any;
}

export interface AuditContext {
    userId?: string | null;
    ip?: string;
    userAgent?: string;
    method?: string;
    path?: string;
}

export interface AuditFilters {
    action?: AuditAction;
    resource?: string;
    userId?: string;
    resourceId?: string;
    q?: string;
    dateFrom?: string | Date;
    dateTo?: string | Date;
}

