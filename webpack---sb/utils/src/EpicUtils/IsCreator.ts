import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { Action, ActionCreator } from "redux";
import { TExtractReturnType } from "../TExtractReturnType";
import { TFlatten } from "../TFlatten";

type TActionCreatorArray = ReadonlyArray<ActionCreator<Action>>;

type TResult<ActionCreators extends TActionCreatorArray> = Observable<TFlatten<TExtractReturnType<ActionCreators>>>;

export function isCreator <ActionCreators extends TActionCreatorArray>(...creators: [...ActionCreators])  {
  const creatorTypes = creators.map((c) => {
    const type = c().type;

    if (typeof type !== "string") {
      throw new Error(`Error occurred in isCreator. Type should be string. But: "${JSON.stringify(type)}" given.`);
    }

    return type;
  });

  return (source: Observable<Action>) => source.pipe(
    filter(({ type }) => creatorTypes.includes(type)),
  ) as TResult<ActionCreators>;
}
