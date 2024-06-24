import { defer, from, type Observable } from "rxjs";
import { type IMetadata } from "@sb/network-bus/Model";
import { type TCall, type TCallWithPostfix } from "@sb/sdk";
import { type TWithContainer } from "@sb/adminui-framework";
import { type getRpcClientFactory } from "./GetRpcClientFactory";

type TFromCallReturnType<P, R, D extends TWithContainer> = (payload: P, deps: D, metadata?: IMetadata) =>
  Observable<R>;

type TFromCallWithPostfixReturnType<P, R, D extends TWithContainer> = (payload: P, postfix: string, deps: D, metadata?: IMetadata) =>
  Observable<R>;

const fromCallFactory = (getClient: ReturnType<typeof getRpcClientFactory>) =>
  <P, R, D extends TWithContainer>(call: TCall<P, R>): TFromCallReturnType<P, R, D> =>
    (payload, deps, metadata) => {
      const client = getClient(deps);

      return defer(() => from(<ReturnType<TCall<P, R>>>(call(client, payload, metadata))));
    };

const fromCallWithPostfixFactory = (getClient: ReturnType<typeof getRpcClientFactory>) =>
  <P, R, D extends TWithContainer>(call: TCallWithPostfix<P, R>): TFromCallWithPostfixReturnType<P, R, D> =>
    (payload, postfix, deps, metadata) => {
      const client = getClient(deps);

      return defer(() => from<ReturnType<TCallWithPostfix<P, R>>>(call(client, postfix, payload, metadata)));
    };

export {
  type TFromCallReturnType,
  type TFromCallWithPostfixReturnType,
  fromCallFactory,
  fromCallWithPostfixFactory,
};
