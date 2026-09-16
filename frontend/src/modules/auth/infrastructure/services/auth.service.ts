import axios from 'axios';
import { API_BASE_URL } from '../../../../core/api/config';
import type { LoginRequestDto, LoginResponseDto } from '../../domain/dto/auth.dto';

/**
 * Auth service base URL.
 * Public endpoints: use plain axios (not the authenticated instance).
 */
const AUTH_BASE_URL = `${API_BASE_URL}/auth`;

/**
 * Authenticates a user with email and password.
 * Uses plain axios because this is a public endpoint (no token required).
 */
const loginUser = async (data: LoginRequestDto): Promise<LoginResponseDto> => {
    const response = await axios.post<LoginResponseDto>(`${AUTH_BASE_URL}/login`, data);
    return response.data;
};

/**
 * Retrieves the currently authenticated user's profile.
 * Requires a valid token — consumed by ProtectedRoute after refresh.
 */
const getCurrentUser = async (accessToken: string): Promise<LoginResponseDto['user']> => {
    const response = await axios.get<LoginResponseDto['user']>(`${AUTH_BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
};

/**
 * Refreshes the access token using a refresh token.
 * Uses plain axios — the old token may be expired.
 */
const refreshAccessToken = async (refreshToken: string): Promise<{ accessToken: string }> => {
    const response = await axios.post<{ accessToken: string }>(`${AUTH_BASE_URL}/refresh`, {
        refreshToken,
    });
    return response.data;
};

export { loginUser, getCurrentUser, refreshAccessToken };
