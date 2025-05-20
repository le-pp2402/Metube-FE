export interface ActionState {
    errors?: Record<string, string[]>;
    message?: string | null;
}

export interface LoginErrorResponse {
    message: string;
    errors?: Record<string, string[]>;
}

export interface LoginSuccessResponse {
    data: {
        token: string;
        id: string;
        username: string;
        email: string;
        is_admin: boolean;
    };
} 