import { type TPageInfo_Fragment } from "@sb/graphql-client";

interface IWithEdges<N> {
  edges: {
    node: N;
    cursor: string;
  }[];
}

interface IWithPageIngo {
  pageInfo: TPageInfo_Fragment;
}

const graphQlDataSelector = <P>(payload: { platform: P; }) => payload.platform;
const graphQlSportsbookDataSelector = <P>(payload: { sportsbook: P; }) => payload.sportsbook;

const graphQlNodeSelector = <Node>({ edges }: IWithEdges<Node>) => edges.map(({ node }) => node);

const graphQlPageInfoSelector = ({ pageInfo }: IWithPageIngo) => pageInfo;

export {
  graphQlDataSelector,
  graphQlSportsbookDataSelector,
  graphQlNodeSelector,
  graphQlPageInfoSelector,
};
