import axios from 'axios';
import { API_BASE_URL } from './config';
import { useAuthStore } from '../store/authStore';

/**
 * Authenticated Axios instance.
 * Automatically attaches the access token from the auth store on every request.
 * Handles 401 responses by clearing the session.
 */
export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000,
});

// Request interceptor — attach access token
api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// Response interceptor — handle global HTTP errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;

            // 401 — Token is no longer valid; clear session so ProtectedRoute redirects to login
            if (status === 401) {
                useAuthStore.getState().clearAuth();
            }
        }
        return Promise.reject(error);
    },
);
