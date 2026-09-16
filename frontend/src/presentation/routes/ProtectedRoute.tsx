import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../core/store/authStore';
import { FullPageLoader } from '../../shared/components/loaders';

/**
 * ProtectedRoute — global authentication guard.
 *
 * Responsibilities:
 * 1. Checks whether an access token exists in the auth store.
 * 2. If no token exists, redirects immediately to /auth/login (no refresh attempted).
 * 3. If a token exists, renders the child routes (FullLayout + module routes).
 * 4. Shows a FullPageLoader while any async session validation is in progress.
 * 5. Preserves the original location via state.from so the user is redirected back after login.
 *
 * Note: Token refresh and re-fetching the current user should be added here
 * when the backend provides a refresh endpoint. The auth store (clearAuth) is
 * used by the Axios 401 interceptor to invalidate the session globally.
 */
const ProtectedRoute = () => {
    const location = useLocation();
    const accessToken = useAuthStore((state) => state.accessToken);
    const [isValidating, setIsValidating] = useState(false);

    useEffect(() => {
        // Placeholder: add token refresh / session re-validation logic here.
        // Call setIsValidating(true) before async work and setIsValidating(false) after.
        setIsValidating(false);
    }, [accessToken]);

    if (isValidating) {
        return <FullPageLoader message="Validating session..." />;
    }

    if (!accessToken) {
        return (
            <Navigate
                to="/auth/login"
                replace
                state={{ from: location }}
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;
