type TRefSymbol = `@@ref@@_${string}`;

// todo accept RefSymbol by actions
const createRefSymbol = (postfix: string): TRefSymbol => `@@ref@@_${postfix}`;

export type { TRefSymbol };
export { createRefSymbol };
