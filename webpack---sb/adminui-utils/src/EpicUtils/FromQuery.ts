import { from, type Observable } from "rxjs";
import { type TGQLClient, type TQueryArg, type TQueryExecutable, type TQueryExecutableNormalizable } from "@sb/graphql-client";
import { getNotNil } from "@sb/utils";
import { insertRecordsByRef } from "./InsertRecordsByRef";

const fromQueryNormalize =
  <Q extends TQueryExecutableNormalizable>(query: Q, arg: Q["normalize"] extends null ? never : TQueryArg<Q, true>, ref: string) =>
    (client: TGQLClient) => {
      const result = from(
        getNotNil(query.normalize, ["adminui-utils", "fromQueryNormalize"], "query.normalize")(client, arg as TQueryArg<Q, true>),
      ) as Observable<Awaited<ReturnType<Q>>>;

      return result.pipe(insertRecordsByRef(ref));
    };

const fromQuery = <Q extends TQueryExecutable>(
  query: Q,
  arg: TQueryArg<Q>,
) => (client: TGQLClient) => from(query(client, arg)) as Observable<Awaited<ReturnType<Q>>>;

export { fromQuery, fromQueryNormalize };

