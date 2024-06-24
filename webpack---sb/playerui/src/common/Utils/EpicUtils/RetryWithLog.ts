import { pipe, retry, tap } from "rxjs";
import { type TExplicitAny } from "@sb/utils";
import { Logger } from "../Logger";

const retryWithLog = <T extends TExplicitAny>(errorTitle?: string) => pipe(
  tap({
    error: (error) => errorTitle ? Logger.warn.epic(errorTitle, error) : Logger.warn.epic("retryWithLog", error),
  }),
  retry<T>({ delay: 5000 }),
);

export { retryWithLog };
