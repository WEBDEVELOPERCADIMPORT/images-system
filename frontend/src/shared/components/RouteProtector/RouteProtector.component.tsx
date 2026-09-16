import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../../core/store/authStore';

interface RouteProtectorProps {
    requiredPermission?: string;
    children: ReactNode;
}

/**
 * RouteProtector — permission-level guard for individual routes within FullLayout.
 *
 * ProtectedRoute handles global authentication (token existence + session validity).
 * RouteProtector handles fine-grained authorization (specific permissions per route).
 */
const RouteProtector = ({ requiredPermission, children }: RouteProtectorProps) => {
    const user = useAuthStore((state) => state.user);

    if (!requiredPermission) {
        return <>{children}</>;
    }

    const isSuperAdmin =
        user?.role === 'SUPER_ADMIN' ||
        user?.roles?.includes('SUPER_ADMIN');

    if (isSuperAdmin) {
        return <>{children}</>;
    }

    // Support both 'read:brands' and 'brands:read' formats
    const invertedPermission = requiredPermission.includes(':')
        ? requiredPermission.split(':').reverse().join(':')
        : requiredPermission;

    const hasPermission =
        Boolean(user?.permissions?.includes(requiredPermission)) ||
        Boolean(user?.permissions?.includes(invertedPermission));

    if (!hasPermission) {
        return <Navigate to="/access-denied" replace />;
    }

    return <>{children}</>;
};

export default RouteProtector;
