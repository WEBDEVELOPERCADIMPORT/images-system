import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { RouteProtector } from '../../../shared/components/RouteProtector';

const AuditLogsListPage = lazy(() => import('./pages/AuditLogsList.page'));

export const auditRoutes: RouteObject[] = [
    {
        index: true,
        element: (
            <RouteProtector requiredPermission='audit:read' >
                <AuditLogsListPage />
            </RouteProtector >
        ),
    },
];
