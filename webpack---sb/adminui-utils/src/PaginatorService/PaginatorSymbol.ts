type TPaginatorSymbol = `@@paginator@@_${string}`;

// todo accept PaginatorSymbol by actions
const createPaginatorSymbol = (postfix: string): TPaginatorSymbol => `@@paginator@@_${postfix}`;

export type { TPaginatorSymbol };
export { createPaginatorSymbol };
