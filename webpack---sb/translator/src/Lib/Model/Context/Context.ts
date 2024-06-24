interface IContext {
  [key: string]: string | number;
}

const contextDelimiter = "~";

const hasContext = (key: string): boolean => key.includes(contextDelimiter);

export type { IContext };

export { contextDelimiter, hasContext };
