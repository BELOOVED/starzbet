enum EPlaceBetError {
  betLimit = "bet_limit.validation_error",
  clientError = "client_error",
  unexpected = "unexpected",
  notEnoughMoney = "bet.not_enough_money",
  playerBonusIsNoLongerActive = "player_bonus.player_bonus_is_no_longer_active",
  betIsNotEligibleForBonus = "player_bonus.bet_is_not_eligible_for_bonus",
  requestedOddHighAndOutdated = "odds_validation_fail.requested_odd_high_and_outdated",
  oddsBufferUpdatedTooLongAgo = "odds_validator_error.odds_buffer_updated_too_long_ago",
  oddWentGreaterThanDelta = "odds_validation_fail.odd_went_greater_than_delta",
  oddWentLowerThanDelta = "odds_validation_fail.odd_went_lower_than_delta",
  parentEntityIsLocked = "odds_validation_fail.parent_entity_is_locked",
}

const isBetLimitError = (code: EPlaceBetError) => code === EPlaceBetError.betLimit;

const isNotEnoughMoney = (code: EPlaceBetError) => code === EPlaceBetError.notEnoughMoney;

const isClientError = (code: EPlaceBetError) => code === EPlaceBetError.clientError;

const isBonusDurationError = (code: EPlaceBetError) => code === EPlaceBetError.playerBonusIsNoLongerActive;

const isBetEligibleForBonusError = (code: EPlaceBetError) => code === EPlaceBetError.betIsNotEligibleForBonus;

const isOddsValidationError = (code: EPlaceBetError) => [
  EPlaceBetError.requestedOddHighAndOutdated,
  EPlaceBetError.oddsBufferUpdatedTooLongAgo,
  EPlaceBetError.oddWentGreaterThanDelta,
  EPlaceBetError.oddWentLowerThanDelta,
  EPlaceBetError.parentEntityIsLocked,
].includes(code);

export {
  EPlaceBetError,
  isBetLimitError,
  isNotEnoughMoney,
  isClientError,
  isBonusDurationError,
  isBetEligibleForBonusError,
  isOddsValidationError,
};
