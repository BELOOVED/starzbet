import { createNotNilSelector, createPropertySelectors } from "@sb/utils";
import { callManagerStartedSelector } from "@sb/call-manager";
import { VIP_CLUB_SETTINGS_LOADING_SYMBOL } from "../VipClubVariables";
import { vipClubSelectors } from "./VipClubSelectors";

const vipClubSettingsLoadingSelector = callManagerStartedSelector.with.symbol(VIP_CLUB_SETTINGS_LOADING_SYMBOL);

const vipClubSettingsNotNilSelector = createNotNilSelector(
  vipClubSelectors.settings,
  ["createNotNilSelector"],
  "vipClubSettingsNotNilSelector",
);

const vipClubSettingsNotNilSelectors = createPropertySelectors(vipClubSettingsNotNilSelector);

export { vipClubSettingsLoadingSelector, vipClubSettingsNotNilSelectors };
