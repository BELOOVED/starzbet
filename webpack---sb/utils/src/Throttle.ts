import { TExplicitAny } from "./TAny";

const throttle = <F extends (...args: TExplicitAny[]) => void>(func: F, time: number): F => {
  let throttled = false;
  let lastArgs: null | TExplicitAny[] = null;

  const wrapper: F = ((...args: TExplicitAny[]) => {
    if (throttled) {
      lastArgs = args;

      return;
    }

    func(...args);

    throttled = true;

    setTimeout(
      () => {
        throttled = false;

        if (lastArgs !== null) {
          wrapper(...lastArgs);
          lastArgs = null;
        }
      },
      time,
    );
  }) as F;

  return wrapper;
};

export { throttle };
