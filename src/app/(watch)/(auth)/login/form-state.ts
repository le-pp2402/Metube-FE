type FieldErrors = {
    [field: string]: string[] | undefined;
};

export type VerifyResponse = {
  errors?: {
    email?: string[];
    code?: string[];
  };
  message?: string;
};

export interface LoginSuccessResponse {
    username: string;
    email: string;
    is_admin: boolean;
    elo: number;
    token: string;
}

export interface LoginErrorResponse {
    message?: string;
}

export type ActionState = {
    errors?: FieldErrors;
    message?: string;
};

export type LoginActionState = ActionState & {
};