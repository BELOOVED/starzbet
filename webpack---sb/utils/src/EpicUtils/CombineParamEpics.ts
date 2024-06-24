import { combineEpics, Epic, StateObservable } from "redux-observable";
import { TExplicitAny } from "../TAny";
import { AnyAction, Dispatch } from "redux";
import { Observable } from "rxjs";
import { finalizeHandleFactory } from "./FinalizeHandle";

type TEpicFactory<P extends Array<TExplicitAny>, E extends Epic> = (...props: P) => E;

const combineParamEpics = <P extends Array<TExplicitAny>, E extends Epic>(...epicFactories: Array<TEpicFactory<P, E>>) =>
  (...props: P) => combineEpics(
    ...epicFactories.map((epicFactory) => epicFactory(...props)),
  )

const combineEpicsWithFinalizeFactory = <Deps>(getDispatch: (deps: Deps) => Dispatch<AnyAction>) => {
  const finalizeHandle = finalizeHandleFactory(getDispatch);
  
  return <E extends Epic<AnyAction, AnyAction, TExplicitAny, Deps>>(...epics: E[]) =>
    (...finalActions: AnyAction[]) =>
      (a$: Observable<AnyAction>, s$: StateObservable<TExplicitAny>, d: Deps): Observable<AnyAction> =>
        combineEpics(...epics)(a$, s$, d).pipe(
          finalizeHandle(d)(...finalActions),
        )
}

const epicWithFinalizeFactory = <Deps>(getDispatch: (deps: Deps) => Dispatch<AnyAction>) => {
  const finalizeHandle = finalizeHandleFactory(getDispatch);
  
  return <E extends Epic<AnyAction, AnyAction, TExplicitAny, Deps>>(epic: E) =>
    (...finalActions: AnyAction[]) => (a$: Observable<AnyAction>, s$: StateObservable<TExplicitAny>, d: Deps) =>
      epic(a$, s$, d).pipe(
        finalizeHandle(d)(...finalActions),
      )
}

const combineParamEpicsWithFinalizeFactory = <Deps>(getDispatch: (deps: Deps) => Dispatch<AnyAction>) => {
  const finalizeHandle = finalizeHandleFactory(getDispatch);
  
  return <P extends Array<TExplicitAny>, E extends Epic<AnyAction, AnyAction, TExplicitAny, Deps>>(
    ...epicFactories: Array<TEpicFactory<P, E>>
  ) => (...finalActions: AnyAction[]) => (...props: P) =>
    (a$: Observable<AnyAction>, s$: StateObservable<TExplicitAny>, d: Deps) =>
      
      combineParamEpics(...epicFactories)(...props)(a$, s$, d).pipe(
        finalizeHandle(d)(...finalActions),
      )
}

// todo uncomment until first usage
// const paramEpicWithFinalizeFactory = <Deps>(getDispatch: (deps: Deps) => Dispatch<AnyAction>) => {
//   const finalizeHandle = finalizeHandleFactory(getDispatch);
//
//   return <P extends Array<TExplicitAny>, E extends Epic<AnyAction, AnyAction, TExplicitAny, Deps>>(
//     epicFactory: TEpicFactory<P, E>
//   ) => (...finalActions: AnyAction[]) => (...props: P) =>
//     (a$: Observable<AnyAction>, s$: StateObservable<TExplicitAny>, d: Deps) =>
//
//       combineParamEpics(epicFactory)(...props)(a$, s$, d).pipe(
//         finalizeHandle(d)(...finalActions)
//       )
// }

export {
  combineParamEpics,
  combineEpicsWithFinalizeFactory,
  epicWithFinalizeFactory,
  combineParamEpicsWithFinalizeFactory,
  // todo uncomment until first usage
  // paramEpicWithFinalizeFactory
};
