import { Logger } from "../InternalLogger";
import type { IClock } from "./IClock";
import { IS_SERVER } from "../Environment";

declare global {
  interface Window {
    START__PERFORMANCE: number;
    START__DATE: number;
    TIMESTAMP__DIFF: number;
  }
}

class MonoClock implements IClock {
  readonly #url: string;
  #lastPerformance: number;
  #lastDate: number;
  #timestampDiff: number;

  constructor(url: string) {
    // todo @Bond check support SSR
    this.#url = url;
    this.#lastPerformance = IS_SERVER ? 0 : window["START__PERFORMANCE"];
    this.#lastDate = IS_SERVER ? 0 : window["START__DATE"];
    this.#timestampDiff = IS_SERVER ? 0 : (window["TIMESTAMP__DIFF"] || 0);

    if (this.#timestampDiff === 0) {
      void this.resyncTimestamp();
    }
  }

  now() {
    if (!this.#lastPerformance || !this.#lastDate) {
      return Date.now();
    }

    if (this.isTimeWrong()) {
      Logger.warn.app("[MonoClock]", "isTimeWrong");

      void this.resyncTimestamp();
    }

    return Date.now() + this.#timestampDiff;
  }

  private async resyncTimestamp() {
    try {
      const start = performance.now();
      const response = await fetch(this.#url);

      const time = await response.json();

      const end = performance.now();

      const serverTimestamp = Math.abs(time + ((end - start) / 2));

      this.#timestampDiff = serverTimestamp - Date.now();
    } catch (e) {
      Logger.warn.app("[MonoClock]", "resyncTimestamp failed", e);
    }
  }

  private isTimeWrong() {
    const currentPerformance = performance.now();
    const currentDate = Date.now();

    const elapsedPerformance = currentPerformance - this.#lastPerformance;
    const elapsedDate = currentDate - this.#lastDate;

    this.#lastDate = currentDate;
    this.#lastPerformance = currentPerformance;

    return Math.abs(elapsedPerformance - elapsedDate) > 20;
  }
}

export { MonoClock };
