import { TExplicitAny } from "./TAny";

const debounce = <F extends (...args: TExplicitAny[]) => void>(func: F, time: number): F => {
  let id: null | NodeJS.Timeout = null;

  return ((...args: TExplicitAny[]) => {
    if (id !== null) {
      clearTimeout(id);
    }

    id = setTimeout(
      () => {
        func(...args);
      },
      time,
    );
  }) as F;
};

export { debounce };
