import { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { authRoutes } from '../../modules/auth/presentation/auth.routes';
import ProtectedRoute from './ProtectedRoute';
import { FullPageLoader } from '../../shared/components/loaders';
import { AccessDeniedPage } from '../../shared/pages';
import DashboardPage from '../../shared/pages/Dashboard.page';

const BlankLayout = lazy(() => import('../layouts/blankLayout'));
const FullLayout = lazy(() => import('../layouts/fullLayout'));

export const appRouter = createBrowserRouter([
    // ── Public routes (unauthenticated) ──────────────────────────────────────
    {
        path: '/auth',
        element: (
            <Suspense fallback={<FullPageLoader />}>
                <BlankLayout />
            </Suspense>
        ),
        children: [...authRoutes],
    },

    // ── Protected routes (authenticated) ─────────────────────────────────────
    {
        path: '/',
        element: (
            <Suspense fallback={<FullPageLoader />}>
                <ProtectedRoute />
            </Suspense>
        ),
        children: [
            {
                element: (
                    <Suspense fallback={<FullPageLoader />}>
                        <FullLayout />
                    </Suspense>
                ),
                children: [
                    // Dashboard — default route
                    {
                        index: true,
                        element: <DashboardPage />,
                    },

                    // Access Denied — reached when RouteProtector denies access
                    {
                        path: 'access-denied',
                        element: <AccessDeniedPage />,
                    },

                    // ── Module routes will be added here as modules are implemented ──
                    // Example:
                    // ...usersRoutes,
                    // ...clientsRoutes,
                ],
            },
        ],
    },

    // ── Catch-all — redirect unknown paths to home ────────────────────────────
    {
        path: '*',
        element: <Navigate to="/" replace />,
    },
]);
