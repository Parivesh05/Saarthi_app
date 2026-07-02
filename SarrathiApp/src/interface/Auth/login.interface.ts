export interface LoginFormValues {
    email: string;
    password: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    phone?: string;
    is_verified?: boolean;
    created_at?: string;
    updated_at?: string;
    profile?: unknown;
}

export interface AuthTokens {
    access_token: string;
    refresh_token: string;
}

export interface AuthResponseData {
    user: User;
    access_token: string;
    refresh_token: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data: AuthResponseData;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isLoading: boolean;
    isProfileLoading: boolean;
    isRestoring: boolean;
    error: string | null;
    isAuthenticated: boolean;
}
