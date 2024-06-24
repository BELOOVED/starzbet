import queryString, { type ParsedQuery } from "query-string";
import { type Location } from "@sb/react-router-compat";
import { type IRouterLocation } from "../Model/IRouterLocation";

/**
 * Adds query to location.
 * Utilises the search prop of location to construct query.
 */
const injectQuery = (location: Location): IRouterLocation => {
  const searchQuery = location.search;

  if (searchQuery.length === 0) {
    return {
      ...location,
      query: {} as ParsedQuery,
    };
  }

  return {
    ...location,
    query: queryString.parse(searchQuery),
  };
};

export { injectQuery };
