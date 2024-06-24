import { type TActiveBoostsForPlayerPayload, type TBoostsForGroupPayload } from "./Model/OddsBoost";

interface IWithOddsBoost {
  oddsBoost: {
    boosts: TBoostsForGroupPayload;
    playerActivatedBoosts: TActiveBoostsForPlayerPayload;
  };
}

const oddsBoostState: IWithOddsBoost = {
  oddsBoost: {
    boosts: [],
    playerActivatedBoosts: {},
  },
};

export { oddsBoostState, type IWithOddsBoost };
