import { useRef } from "react";
import { TExplicitAny } from "../TAny";

type TPersistRef<T> = {
  initialized: boolean;
  value: T | null;
};

const usePersist = <T>(source: () => T) => {
  const ref = useRef<TPersistRef<T>>({ initialized: false, value: null });

  if (!ref.current.initialized) {
    ref.current.value = source();
    ref.current.initialized = true;
  }

  return ref.current.value as T;
};

const usePersistCallback = <T extends (...args: TExplicitAny[]) => TExplicitAny>(source: T) => useRef<T>(source).current;

export { usePersist, usePersistCallback };

