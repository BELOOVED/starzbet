import { BehaviorSubject, filter } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { type IAuthToken } from "@sb/auth";
import { clientError } from "@sb/network-bus/Utils";
import { Logger } from "../../Utils/Logger";

interface IAuthSubject {
  logged: boolean;
  refreshing: boolean;
  token: IAuthToken | undefined;
}

const initialValue: IAuthSubject = { logged: false, refreshing: false, token: undefined };

class AuthTokenService {
  #authSubject = new BehaviorSubject(initialValue);

  #refreshRejected = false;

  #abortControllers: AbortController[] = [];

  #debug = false;

  async getTokenOrNil(withoutWait = false) {
    if (withoutWait) {
      return this.#authSubject.getValue().token;
    }

    return this.getToken<IAuthToken | undefined>(false);
  }

  async getTokenOrError(withoutWait = false) {
    if (withoutWait) {
      const token = this.#authSubject.getValue().token;

      if (!token) {
        throw new Error("[AuthTokenService]: called by anon");
      }

      return token;
    }

    return this.getToken<IAuthToken>(true);
  }

  nextToken(token: IAuthToken | undefined) {
    this.debugLog("nextToken", token);

    this.#refreshRejected = false;

    this.#authSubject.next({ logged: true, refreshing: false, token });
  }

  refresh() {
    this.debugLog("refresh");

    this.abortAll();

    this.#refreshRejected = false;

    this.#authSubject.next({ ...this.#authSubject.getValue(), refreshing: true });
  }

  rejectRefresh() {
    this.debugLog("rejectRefresh");

    this.#refreshRejected = true;

    this.#authSubject.next({ ...this.#authSubject.getValue(), refreshing: false });
  }

  reset() {
    this.debugLog("reset");

    this.#refreshRejected = false;

    this.#authSubject.next(initialValue);

    this.#abortControllers = [];
  }

  createSignal() {
    const abortController = new AbortController();

    this.#abortControllers.push(abortController);

    return abortController.signal;
  }

  private abortAll() {
    this.debugLog("abortAll");

    this.#abortControllers.forEach((it) => {
      it.abort("aborted by AuthTokenService");
    });

    this.#abortControllers = [];
  }

  private getToken<T>(strict: boolean) {
    this.debugLog("getToken");

    return new Promise<T>((resolve, reject) => {
      this.#authSubject.pipe(
        distinctUntilChanged(),
        filter(({ refreshing }) => !refreshing),
        map(({ token }) => token),
      ).subscribe({
        next: (token) => {
          if (this.#refreshRejected) {
            this.reset();

            reject(clientError("[AuthTokenService]: refresh token was rejected"));
          }

          if (strict && token === undefined) {
            reject(new Error("[AuthTokenService]: called by anon"));
          }

          resolve(token as T);
        },
        error: reject,
      });
    });
  }

  private debugLog(...args: unknown[]) {
    if (!this.#debug) {
      return;
    }

    Logger.info.app("[AuthTokenService]", ...args);
  }
}

const authTokenService = new AuthTokenService();

export {
  authTokenService,
};
