import { createCallManagerSymbol } from "@sb/call-manager";
import { createMemoSelector, createPropertySelectors } from "@sb/utils";
import { type EBanner_Device } from "@sb/graphql-client";
import type { TBanner_AttachedBanner_Fragment } from "@sb/graphql-client/PlayerUI";
import { baseSortWith } from "../../../../sportsbookui/Utils/SortWith";
import { ascend } from "../../../../sportsbookui/Utils/Ascend";
import { DEFAULT_PLAYER_GROUP_ID } from "../../../Constants/DefaultPlayerGroupId";
import { playerDetailsSelectors } from "../../Player/Selectors/PlayerSelectors";
import { type IWithBannerState } from "../BannerInitialState";

const bannerSelectors = createPropertySelectors(({ banner }: IWithBannerState) => banner);

const bannerSiteMarkupSelectors = createPropertySelectors(bannerSelectors.siteMarkup);

const bannerSort = [ascend(({ order }: TBanner_AttachedBanner_Fragment) => Number(order))];

const bannersByParamsSelector = createMemoSelector(
  [
    (_, device: EBanner_Device) => device,
    (_, __, page: string) => page,
    (_, __, ___, slot: string) => slot,
    bannerSiteMarkupSelectors.pages,
    playerDetailsSelectors.groupId,
  ],
  (device, page, slot, pages, groupId = DEFAULT_PLAYER_GROUP_ID) => {
    const filtered = pages.filter((it) => it.device === device && it.name === page);

    const slots = filtered
      .flatMap(({ slots }) => slots)
      .filter(({ name }) => name === slot);

    const banners = slots
      .flatMap(({ banners }) => banners)
      .filter(({ banner }) => banner.active && banner.removedAt === null && banner.playerGroups.some(({ id }) => id === groupId));

    return baseSortWith(bannerSort, banners).map(({ banner }) => banner);
  },
);

const allPagesWithTopBannerSelector = createMemoSelector(
  [
    (_, device: EBanner_Device) => device,
    bannerSiteMarkupSelectors.pages,
    playerDetailsSelectors.groupId,
  ],
  (device, pages, groupId = DEFAULT_PLAYER_GROUP_ID) => pages.reduce<string[]>(
    (acc, page) => {
      if (page.device !== device) {
        return acc;
      }
      const slot = page.slots.find((it) => it.name === "top");
      if (!slot) {
        return acc;
      }

      const pageWithBanner = slot.banners.some(({ banner }) =>
        banner.active && banner.removedAt === null && banner.playerGroups.some(({ id }) => id === groupId));

      if (pageWithBanner) {
        acc.push(page.name);
      }

      return acc;
    },
    [],
  ),
);

const BANNERS_LOADING_SYMBOL = createCallManagerSymbol("bannersLoadingSymbol");

export {
  bannerSiteMarkupSelectors,
  bannersByParamsSelector,
  BANNERS_LOADING_SYMBOL,
  allPagesWithTopBannerSelector,
};
