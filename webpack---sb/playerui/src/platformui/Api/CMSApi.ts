import {
  type Client,
  ECms_BlockWhereFieldPaths,
  ECms_PageWhereFieldPaths,
  EPlatform_GameLabelWhereFieldPaths,
  EWhere_Predicate,
  type TGQLClient,
} from "@sb/graphql-client";
import { deferWithAbort } from "@sb/utils";
import {
  cmsBlocksQueryPlayerUIAffiliateUIOptionalFields,
  cmsPageMetaContentsQueryPlayerUIAffiliateUIOptionalFields,
  cmsPagesQueryOptionalFields,
  cmsVariablesQueryOptionalFields,
  query_Cms_Blocks,
  query_Cms_PageMetaContents,
  query_Cms_Pages,
  query_Cms_Variables,
} from "@sb/graphql-client/CmsUI";
import { type TProjectCode } from "@sb/sdk/common/cms/api/model/ProjectCode";
import { type EAffiliateBlockMap, type TBlockUnion } from "@sb/cms-core";
import { platformGameLabelsQueryOptionalFields, query_Platform_GameLabels } from "@sb/graphql-client/PlayerUI";
import { retryWithLog } from "../../common/Utils/EpicUtils/RetryWithLog";
import { CMS_THEME_POSTFIX } from "../../common/Utils/CmsThemePostfix";

const gql_Cms_Blocks = (graphQLClient: TGQLClient, type: Exclude<TBlockUnion, EAffiliateBlockMap>, signal?: AbortSignal) =>
  query_Cms_Blocks(
    graphQLClient,
    {
      optionalFields: cmsBlocksQueryPlayerUIAffiliateUIOptionalFields,
      variables: {
        theme: CMS_THEME_POSTFIX,
        where: {
          fieldPath: ECms_BlockWhereFieldPaths.blockType,
          predicate: EWhere_Predicate.eq,
          value: type,
        },
      },
      signal,
    },
  ).then(({ cms: { Blocks } }) => Blocks);

const CMSLoadBlocksContentByBlockType = (type: Exclude<TBlockUnion, EAffiliateBlockMap>, graphQLClient: Client) => deferWithAbort(
  (signal) => gql_Cms_Blocks(
    graphQLClient,
    type,
    signal,
  ),
).pipe(
  retryWithLog(),
);

const CMSLoadNotRemovedPagesByProjectCode = (projectCode: TProjectCode, graphQLClient: Client) => deferWithAbort(
  (signal) => query_Cms_Pages(
    graphQLClient,
    {
      optionalFields: cmsPagesQueryOptionalFields,
      variables: {
        theme: CMS_THEME_POSTFIX,
        where: {
          predicate: EWhere_Predicate.and,
          operands: [
            {
              fieldPath: ECms_PageWhereFieldPaths.cmsPageProjectCode,
              predicate: EWhere_Predicate.eq,
              value: projectCode,
            },
            {
              fieldPath: ECms_PageWhereFieldPaths.cmsPageRemovedAt,
              predicate: EWhere_Predicate.isNull,
            },
          ],
        },
      },
      signal,
    },
  ).then(({ cms: { Pages } }) => Pages),
).pipe(
  retryWithLog(),
);

const gql_Cms_Variables = (graphQLClient: TGQLClient, signal?: AbortSignal) => query_Cms_Variables(
  graphQLClient,
  {
    optionalFields: cmsVariablesQueryOptionalFields,
    variables: { theme: CMS_THEME_POSTFIX },
    signal,
  },
).then(({ cms: { Variables } }) => Variables);

const CMSLoadAllVariables = (graphQLClient: Client) => deferWithAbort(
  (signal) => gql_Cms_Variables(graphQLClient, signal),
).pipe(
  retryWithLog(),
);

const CMSLoadNotEmptyMetaPageContents = (ids: string[], graphQLClient: Client) => deferWithAbort(
  (signal) => query_Cms_PageMetaContents(
    graphQLClient,
    {
      optionalFields: cmsPageMetaContentsQueryPlayerUIAffiliateUIOptionalFields,
      variables: { ids, theme: CMS_THEME_POSTFIX },
      signal,
    },
  ).then(({ cms: { PageMetaContents } }) => PageMetaContents.map((edge) => edge)),
).pipe(
  retryWithLog(),
);

const cmsLoadPageContentByPageId = (pageId: string, graphQLClient: Client) => deferWithAbort(
  (signal) => query_Cms_Blocks(
    graphQLClient,
    {
      optionalFields: cmsBlocksQueryPlayerUIAffiliateUIOptionalFields,
      variables: {
        theme: CMS_THEME_POSTFIX,
        where: {
          fieldPath: ECms_BlockWhereFieldPaths.blockPageId,
          predicate: EWhere_Predicate.eq,
          value: pageId,
        },
      },
      signal,
    },
  ).then(({ cms: { Blocks } }) => Blocks),
).pipe(
  retryWithLog(),
);

const CMSLoadPagesContentByPageIds = (pageIds: string[], graphQLClient: Client) => deferWithAbort(
  (signal) => query_Cms_Blocks(
    graphQLClient,
    {
      optionalFields: cmsBlocksQueryPlayerUIAffiliateUIOptionalFields,
      variables: {
        theme: CMS_THEME_POSTFIX,
        where: {
          predicate: EWhere_Predicate.in,
          fieldPath: ECms_BlockWhereFieldPaths.blockPageId,
          value: JSON.stringify(pageIds),
        },
      },
      signal,
    },
  ).then(({ cms: { Blocks } }) => Blocks),
).pipe(
  retryWithLog(),
);

const CMSLoadGameLabels = (labelIds: string[], graphQLClient: Client) => deferWithAbort(
  (signal) => query_Platform_GameLabels(
    graphQLClient,
    {
      optionalFields: platformGameLabelsQueryOptionalFields,
      variables: {
        where: {
          fieldPath: EPlatform_GameLabelWhereFieldPaths.labelId,
          predicate: EWhere_Predicate.in,
          value: JSON.stringify(labelIds),
        },
      },
      signal,
    },
  ).then(({ platform: { GameLabels } }) => GameLabels),
).pipe(
  retryWithLog(),
);

export {
  CMSLoadGameLabels,
  CMSLoadBlocksContentByBlockType,
  CMSLoadNotRemovedPagesByProjectCode,
  CMSLoadPagesContentByPageIds,
  cmsLoadPageContentByPageId,
  CMSLoadNotEmptyMetaPageContents,
  CMSLoadAllVariables,

  gql_Cms_Variables,
  gql_Cms_Blocks,
};
