export type AuditAction = 'LOGIN' | 'LOGOUT' | 'CREATE' | 'UPDATE' | 'DELETE';

export interface AuditUserSummary {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string | null;
}

export interface AuditLogItem {
    id: string;
    userId: string | null;
    action: AuditAction;
    resource: string;
    resourceId: string | null;
    details: Record<string, any> | null;
    createdAt: string;
    user?: AuditUserSummary | null;
}

export interface AuditFilters {
    action?: string;
    resource?: string;
    userId?: string;
    resourceId?: string;
    q?: string;
    dateFrom?: string;
    dateTo?: string;
}

export interface PaginatedAuditLogsResponse {
    data: AuditLogItem[];
    total: number;
    limit: number;
    offset: number;
}
