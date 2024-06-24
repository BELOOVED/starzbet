import { from } from "rxjs";
import { deferWithAbort, type TExplicitAny } from "@sb/utils";

type TCommand = (payload: TExplicitAny, signal: AbortSignal) => TExplicitAny;

const callWithAbort = <C extends TCommand>(command: C, payload: Parameters<C>[0]) => (
  deferWithAbort((signal) => from(command(payload, signal) as ReturnType<C>))
);

export { callWithAbort };
