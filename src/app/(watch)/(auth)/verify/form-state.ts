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