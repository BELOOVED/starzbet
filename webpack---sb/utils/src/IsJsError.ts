export const isJsError = (error: unknown): error is Error => error instanceof Error;
