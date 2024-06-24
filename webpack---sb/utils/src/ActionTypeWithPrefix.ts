export const actionTypeWithPrefix = (prefix: string) => (type: string): string => `${prefix}/${type}`;
