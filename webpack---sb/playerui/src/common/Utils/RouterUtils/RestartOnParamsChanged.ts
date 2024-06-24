import { type TRouterMatch } from "@sb/router";

const restartOnParamsChanged = (prev: ReturnType<TRouterMatch>, next: ReturnType<TRouterMatch>) => {
  if(!prev || !next){
    return false;
  }

  const prevParams = prev.params as Record<string, unknown>;
  const nextParams = next.params as Record<string, unknown>;

  return Object.keys(nextParams).some((key) => prevParams[key] !== nextParams[key]);
};

export { restartOnParamsChanged };
