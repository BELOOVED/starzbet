import { type TActiveBoostsForPlayerPayload, type TBoostsForGroupPayload } from "./Model/OddsBoost";

const oddsBoostFetchedAction = (boosts: TBoostsForGroupPayload) => ({
  type: "@ODDS_BOOST/FETCHED",
  payload: { boosts },
});

const playerActivatedBoostsFetchedAction = (playerActivatedBoosts: TActiveBoostsForPlayerPayload) => ({
  type: "@ODDS_BOOST/PLAYER_ACTIVATED_BOOSTS_FETCHED",
  payload: { playerActivatedBoosts },
});

export { oddsBoostFetchedAction, playerActivatedBoostsFetchedAction };
