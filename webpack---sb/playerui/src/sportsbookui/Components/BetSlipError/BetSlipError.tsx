// @ts-nocheck
import { createElement, memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_belSlip_saga_title_errorBetWasDeclined,
  sportsbookui_betSlip_error_betIsNotEligibleForBonus,
  sportsbookui_betSlip_error_minimalTotalOdds,
  sportsbookui_betSlip_error_notEnoughMoney,
  sportsbookui_betSlip_error_playerBonusIsNoLongerActive,
  sportsbookui_betSlip_error_stakeIncreased,
  sportsbookui_betSlip_error_stakeReduced,
} from "@sb/translates/sportsbookui/CommonTKeys";
import { betSlipErrorSelector } from "../../Store/BetSlip/Selectors/BetSlipSelectors";
import { EPlaceBetError } from "../../Store/BetSlip/Model/EPlaceBetError";
import { betLimitEnum } from "../../Store/BetSlip/Model/BetLimit";
import { coefficientFormat } from "../../Store/Feed/Model/Outcome/CoefficientFormat";

const LimitError = memo(({ error }) => {
  const [t] = useTranslation();

  const limit = error.context.limit;

  switch (limit) {
    case betLimitEnum.MIN_PER_BET: {
      return t(sportsbookui_betSlip_error_stakeIncreased);
    }

    case betLimitEnum.MAX_WIN_TOTAL:
    case betLimitEnum.MAX_WIN_PER_EVENT:
    case betLimitEnum.MAX_WIN_PER_BET:
    case betLimitEnum.MAX_BET_PER_EVENT:
    case betLimitEnum.MAX_PER_BET: {
      return t(sportsbookui_betSlip_error_stakeReduced);
    }

    case betLimitEnum.MIN_COEFFICIENT_PER_BET: {
      return t(sportsbookui_betSlip_error_minimalTotalOdds, { odds: coefficientFormat(error.context.alert.validCoefficient) });
    }

    case betLimitEnum.MIN_COEFFICIENT_PER_PICK: {
      return t(sportsbookui_betSlip_error_minimalTotalOdds, { odds: coefficientFormat(error.context.rule.coefficient) });
    }

    default:
      return t(sportsbookui_belSlip_saga_title_errorBetWasDeclined);
  }
});
LimitError.displayName = "LimitError";

const SimpleError = memo(({ error }) => {
  const [t] = useTranslation();

  const message = error.message ? error.message : sportsbookui_belSlip_saga_title_errorBetWasDeclined;

  return (
    t(message)
  );
});
SimpleError.displayName = "SimpleError";

const NotEnoughMoney = memo(() => {
  const [t] = useTranslation();

  return (
    t(sportsbookui_betSlip_error_notEnoughMoney)
  );
});
NotEnoughMoney.displayName = "NotEnoughMoney";

const PlayerBonusIsNoLongerActive = memo(() => {
  const [t] = useTranslation();

  return (
    t(sportsbookui_betSlip_error_playerBonusIsNoLongerActive)
  );
});
PlayerBonusIsNoLongerActive.displayName = "PlayerBonusIsNoLongerActive";

const BetIsNotEligibleForBonus = memo(() => {
  const [t] = useTranslation();

  return (
    t(sportsbookui_betSlip_error_betIsNotEligibleForBonus)
  );
});
BetIsNotEligibleForBonus.displayName = "BetIsNotEligibleForBonus";

const components = {
  [EPlaceBetError.betLimit]: LimitError,
  [EPlaceBetError.clientError]: SimpleError,
  [EPlaceBetError.unexpected]: SimpleError,
  [EPlaceBetError.notEnoughMoney]: NotEnoughMoney,
  [EPlaceBetError.playerBonusIsNoLongerActive]: PlayerBonusIsNoLongerActive,
  [EPlaceBetError.betIsNotEligibleForBonus]: BetIsNotEligibleForBonus,
};

const BetSlipError = ({ children }) => {
  const errors = useSelector(betSlipErrorSelector, (a, b) => a === b);

  const [showed, setShowed] = useState(false);

  const timeOut = useRef(null);

  useEffect(
    () => {
      if (errors) {
        clearTimeout(timeOut.current);

        setShowed(true);

        timeOut.current = setTimeout(setShowed, 3000, false);
      }

      return () => clearTimeout(timeOut.current);
    },
    [errors],
  );

  if (errors === null || !showed) {
    return null;
  }

  const [error] = errors;

  const component = error.code && components[error.code] ? components[error.code] : components[EPlaceBetError.unexpected];

  return children(createElement(component, { error }));
};
BetSlipError.displayName = "BetSlipError";

export { BetSlipError };
