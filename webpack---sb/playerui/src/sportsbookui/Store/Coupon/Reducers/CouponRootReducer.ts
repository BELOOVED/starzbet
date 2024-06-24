import { createRootReducer } from "@sb/utils";
import { sportMenuAddTournamentIdAction, sportMenuRemoveTournamentIdAction } from "../../SportMenu/SportMenuActions";
import {
  couponAddTournamentAction,
  couponCancelCreateAction,
  couponCancelSaveAction,
  couponChangeSkipCreateTipAction,
  couponCompleteSaveAction,
  couponDisableFinaliseTooltipAction,
  couponDisableStartTooltipAction,
  couponEnableFinaliseTooltipAction,
  couponFetchedAction,
  couponGroupsFetchedAction,
  couponRemoveNotDefaultAction,
  couponRemoveTournamentAction,
  couponSaveAction,
  couponStartCreateAction,
  couponStartSaveAction,
  couponToggleExpandAction,
  couponUpdateAction,
} from "../CouponActions";
import { couponGroupsFetchedReducer } from "./CouponGroupsFetchedReducer";
import { couponStartCreateReducer } from "./CouponStartCreateReducer";
import { couponCancelCreateReducer } from "./CouponCancelCreateReducer";
import { couponDisableStartTooltipReducer } from "./CouponDisableStartTooltipReducer";
import { couponEnableFinaliseTooltipReducer } from "./CouponEnableFinaliseTooltipReducer";
import { couponDisableFinaliseTooltipReducer } from "./СouponDisableFinaliseTooltipReducer";
import { couponAddTournamentReducer } from "./CouponAddTournamentReducer";
import { couponRemoveTournamentReducer } from "./CouponRemoveTournamentReducer";
import { couponStartSaveReducer } from "./CouponStartSaveReducer";
import { couponCancelSaveReducer } from "./СouponCancelSaveReducer";
import { couponSaveReducer } from "./CouponSaveReducer";
import { couponStartUpdateReducer } from "./CouponStartUpdateReducer";
import { couponCompleteSaveReducer } from "./CouponCompleteSaveReducer";
import { couponFetchedReducer } from "./CouponFetchedReducer";
import { couponRemoveNotDefaultReducer } from "./CouponRemoveNotDefaultReducer";
import { couponChangeSkipCreateTipReducer } from "./CouponChangeSkipCreateTipReducer";
import { couponToggleExpandReducer } from "./CouponToggleExpandReducer";

const couponRootReducer = createRootReducer([
  [couponGroupsFetchedReducer, couponGroupsFetchedAction],
  [couponRemoveNotDefaultReducer, couponRemoveNotDefaultAction],
  [couponStartCreateReducer, couponStartCreateAction],
  [couponCancelCreateReducer, couponCancelCreateAction],
  [couponDisableStartTooltipReducer, couponDisableStartTooltipAction],
  [couponEnableFinaliseTooltipReducer, couponEnableFinaliseTooltipAction],
  [couponDisableFinaliseTooltipReducer, couponDisableFinaliseTooltipAction],
  [couponAddTournamentReducer, sportMenuAddTournamentIdAction],
  [couponAddTournamentReducer, couponAddTournamentAction],
  [couponRemoveTournamentReducer, sportMenuRemoveTournamentIdAction],
  [couponRemoveTournamentReducer, couponRemoveTournamentAction],
  [couponStartSaveReducer, couponStartSaveAction],
  [couponCancelSaveReducer, couponCancelSaveAction],
  [couponSaveReducer, couponSaveAction],
  [couponStartUpdateReducer, couponUpdateAction],
  [couponCompleteSaveReducer, couponCompleteSaveAction],
  [couponFetchedReducer, couponFetchedAction],
  [couponChangeSkipCreateTipReducer, couponChangeSkipCreateTipAction],
  [couponToggleExpandReducer, couponToggleExpandAction],
]);

export { couponRootReducer };
