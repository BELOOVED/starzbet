import { useEffect } from "react";
import { EKeyCodes } from "../EKeyCodes";
import { getNotNil } from "../IsNil";
import { TVoidFn } from "../TVoidFn";

type TConfig = {
  // To fix issues with input with autofocus in page we can pass it as true
  passRepeat?: boolean;
}

class Manager {
  private static initialized: boolean = false;
  private static callbacks: TVoidFn[] = [];

  public static add(callback: TVoidFn, config: TConfig) {
    if (!Manager.initialized) {
      Manager.initialize(config);
    }

    this.callbacks.push(callback);
  }

  public static remove(callback: TVoidFn) {
    const index = this.callbacks.indexOf(callback);

    if (index === -1) {
      throw new Error("Escape Listener to remove not found");
    }

    this.callbacks.splice(index, 1);
  }

  private static initialize(config: TConfig) {
    window.addEventListener("keydown", (e) => {
      if ((!config.passRepeat && e.repeat) || e.code !== EKeyCodes.escape) {
        return;
      }

      if (this.callbacks.length > 0) {
        getNotNil(
          Manager.callbacks[Manager.callbacks.length - 1],
          ["Escape Listener"],
          "Manager.callbacks[Manager.callbacks.length - 1]"
        )();
      }
    });

    Manager.initialized = true;
  }
}

const useEscape = (callback: TVoidFn, config: TConfig = {}) => {
  useEffect(
    () => {
      Manager.add(callback, config);

      return () => {
        Manager.remove(callback);
      };
    },
    [callback],
  );
};

export { useEscape };
