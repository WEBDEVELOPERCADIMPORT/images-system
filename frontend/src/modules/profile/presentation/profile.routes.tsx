import type { RouteObject } from 'react-router-dom';
import { ProfilePage } from './profile.lazy';
import { RouteProtector } from '../../../shared/components/RouteProtector';

export const profileRoutes: RouteObject[] = [
    {
        index: true,
        element: (
            <RouteProtector>
                <ProfilePage />
            </RouteProtector>
        ),
    },
];
