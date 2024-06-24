import { useParams as useParamsBase } from "react-router-dom";

type TParams<T> = { [K in keyof T]?: string };

const useParams = <T extends TParams<T> = Record<string, string | undefined>>() => useParamsBase<T>();

export { useParams };
