import { useEffect } from "react";

type TCallback = (time: number) => void;

class State {
  private static intervalId: null | ReturnType<typeof setInterval> = null;
  private static callbacks = new Set<TCallback>();

  public static add(callback: TCallback): void {
    State.callbacks.add(callback);

    callback(Date.now());

    if (State.intervalId === null) {
      State.intervalId = setInterval(
        () => {
          const timestamp = Date.now();

          State.callbacks.forEach((it) => {
            it(timestamp);
          });
        },
        1000,
      )
    }
  }

  public static remove(callback: TCallback): void {
    State.callbacks.delete(callback);

    if (State.callbacks.size > 0) {
      return;
    }

    if (State.intervalId !== null) {
      clearInterval(State.intervalId)

      State.intervalId = null;
    }
  }
}

const useTime = (callback: null | TCallback): void => {
  useEffect(
    () => {
      if (callback === null) {
        return undefined;
      }

      State.add(callback);

      return () => {
        State.remove(callback);
      }
    },
    [callback],
  );
}

export { useTime };
