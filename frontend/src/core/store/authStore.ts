import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser } from '../../modules/auth/domain/interfaces/auth.interfaces';

interface AuthState {
    accessToken: string | null;
    user: AuthUser | null;
    isRestoringSession: boolean;
    setAuth: (token: string, user: AuthUser) => void;
    setToken: (token: string) => void;
    setUser: (user: AuthUser | null) => void;
    setIsRestoringSession: (isRestoring: boolean) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            user: null,
            isRestoringSession: false,
            setAuth: (token, user) => set({ accessToken: token, user }),
            setToken: (token) => set({ accessToken: token }),
            setUser: (user) => set({ user }),
            setIsRestoringSession: (isRestoringSession) => set({ isRestoringSession }),
            clearAuth: () => set({ accessToken: null, user: null }),
        }),
        {
            name: 'auth-storage',
            // User is kept ONLY in memory for security; only accessToken is persisted
            partialize: (state) => ({ accessToken: state.accessToken }),
        },
    ),
);
