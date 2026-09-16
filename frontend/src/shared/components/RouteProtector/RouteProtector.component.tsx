import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../../core/store/authStore';

interface RouteProtectorProps {
    requiredPermission: string;
    children: ReactNode;
}

/**
 * RouteProtector — permission-level guard for individual routes within FullLayout.
 *
 * ProtectedRoute handles global authentication (token existence + session validity).
 * RouteProtector handles fine-grained authorization (specific permissions per route).
 *
 * Usage:
 *   <RouteProtector requiredPermission="VIEW_USERS">
 *     <UsersListPage />
 *   </RouteProtector>
 */
const RouteProtector = ({ requiredPermission, children }: RouteProtectorProps) => {
    const user = useAuthStore((state) => state.user);

    if (!user?.permissions?.includes(requiredPermission)) {
        return <Navigate to="/access-denied" replace />;
    }

    return <>{children}</>;
};

export default RouteProtector;
