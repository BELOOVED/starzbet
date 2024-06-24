const keys = <O extends Record<string, any>>(obj: O): Array<keyof O> => Object.keys(obj);

export { keys };
