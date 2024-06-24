import { TNil } from "./TNil";

interface IWithEdges<T> {
  edges: {
    cursor?: string,
    node: T
  }[]
}

export const extractNodesFromEdges = <T>(query?: IWithEdges<T> | TNil): T[] =>
  query?.edges.map<T>(({ node }) => node) ?? [];
