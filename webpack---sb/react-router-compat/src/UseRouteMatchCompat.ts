import { useRouteMatch as useRouteMatchBase } from "react-router-dom";

interface IProps {
  path?: string | string[];
  exact?: boolean;
  sensitive?: boolean;
  strict?: boolean;
}

type TParams<T> = { [K in keyof T]?: string }

type TUseRouteMatchParams = [string | string[] | IProps];

const useRouteMatch = <
  T extends TParams<T> = TParams<Record<string, string>>
>(...params: TUseRouteMatchParams) => useRouteMatchBase<T>(...params);

export { useRouteMatch };
