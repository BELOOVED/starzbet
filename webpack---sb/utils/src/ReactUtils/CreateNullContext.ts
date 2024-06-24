import { Context, createContext, useContext } from "react";

const createNullContext = <T>(): [Context<T>, () => T] => {
  const nullContext = createContext<T>(null as unknown as T);

  const useNullContext = () => {
    const value = useContext(nullContext);

    if (value === null) {
      throw new Error(`Context not provided!`);
    }

    return value;
  };

  return [nullContext, useNullContext];
};

const createNullableContext = <T>(): [Context<T>, () => T] => {
  const nullContext = createContext<T>(undefined as unknown as T);

  const useNullContext = () => useContext(nullContext);

  return [nullContext, useNullContext];
};

export {
  createNullContext,
  createNullableContext
};
