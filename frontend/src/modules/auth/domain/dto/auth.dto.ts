import type { AuthUser } from '../interfaces/auth.interfaces';

export interface LoginRequestDto {
    email: string;
    password: string;
}

export interface LoginResponseDto {
    accessToken: string;
    refreshToken?: string;
    user: AuthUser;
}

export interface RefreshTokenRequestDto {
    refreshToken: string;
}

export interface RefreshTokenResponseDto {
    accessToken: string;
    refreshToken?: string;
}
