import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

interface SidebarContextType {
    isCollapsed: boolean;
    isMobileOpen: boolean;
    toggleSidebar: () => void;
    closeMobileSidebar: () => void;
    setCollapsed: (collapsed: boolean) => void;
    sidebarWidth: number;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SIDEBAR_EXPANDED_WIDTH = 260;
export const SIDEBAR_COLLAPSED_WIDTH = 72;

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
        const saved = localStorage.getItem('sidebar_collapsed');
        return saved ? JSON.parse(saved) : false;
    });
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('sidebar_collapsed', JSON.stringify(isCollapsed));
    }, [isCollapsed]);

    // Close mobile drawer on desktop resize
    useEffect(() => {
        if (!isMobile) {
            setIsMobileOpen(false);
        }
    }, [isMobile]);

    const toggleSidebar = () => {
        if (isMobile) {
            setIsMobileOpen((prev) => !prev);
        } else {
            setIsCollapsed((prev) => !prev);
        }
    };

    const closeMobileSidebar = () => {
        setIsMobileOpen(false);
    };

    const setCollapsed = (collapsed: boolean) => {
        setIsCollapsed(collapsed);
    };

    const sidebarWidth = isMobile
        ? SIDEBAR_EXPANDED_WIDTH
        : isCollapsed
        ? SIDEBAR_COLLAPSED_WIDTH
        : SIDEBAR_EXPANDED_WIDTH;

    return (
        <SidebarContext.Provider
            value={{
                isCollapsed,
                isMobileOpen,
                toggleSidebar,
                closeMobileSidebar,
                setCollapsed,
                sidebarWidth,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = (): SidebarContextType => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};
