import {
    DashboardOutlined,
    BusinessOutlined,
    FolderOutlined,
    GroupOutlined,
    AdminPanelSettingsOutlined,
    ManageHistoryOutlined,
} from '@mui/icons-material';
import type { ElementType } from 'react';

export interface MenuItem {
    name?: string;
    module?: string;
    group?: string;
    link?: string;
    icon?: ElementType;
    permissions?: string[];
    requiresStudent?: boolean;
    requiresTeacher?: boolean;
    children?: MenuItem[];
}

const MenuItems: MenuItem[] = [
    { group: 'Main' },
    {
        name: 'Dashboard',
        icon: DashboardOutlined,
        link: '/',
    },

    { group: 'Asset Management', permissions: ['brands:read', 'folders:read'] },
    {
        module: 'Catalog',
        name: 'Brands',
        icon: BusinessOutlined,
        link: '/brands',
        permissions: ['brands:read'],
    },
    {
        module: 'Directories',
        name: 'Directories Tree',
        icon: FolderOutlined,
        link: '/directorios',
        permissions: ['folders:read'],
    },

    { group: 'Administration', permissions: ['users:read', 'audit:read'] },
    {
        module: 'Users',
        name: 'Users Management',
        icon: GroupOutlined,
        link: '/users',
        permissions: ['users:read'],
    },
    {
        module: 'Audit',
        name: 'Audit Logs',
        icon: ManageHistoryOutlined,
        link: '/audit-logs',
        permissions: ['audit:read'],
    },

    { group: 'Account' },

    {
        name: 'My Profile',
        icon: AdminPanelSettingsOutlined,
        link: '/profile',
    },
];

export default MenuItems;
