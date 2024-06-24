// @ts-nocheck
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { EMoneyFormat, Money, useAction } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_autoCashoutForm_button_removeCashOutRule,
  sportsbookui_starzbet_autoCashoutForm_input_cashOutAmountLeaveAmount,
  sportsbookui_starzbet_autoCashoutForm_title_autoCashOutIfTheProfitReaches,
  sportsbookui_starzbet_autoCashoutForm_title_autoCashOutRuleActive,
  sportsbookui_starzbet_autoCashoutForm_title_ifTheProfitReaches,
  sportsbookui_starzbet_autoCashoutForm_title_partialCashOutRuleActive,
  sportsbookui_starzbet_autoCashoutForm_title_thisNewFeature,
  sportsbookui_starzbet_autoCashoutForm_title_yourCurrentCashOut,
  sportsbookui_starzbet_cashOut_button_cancelRule,
  sportsbookui_starzbet_cashOut_button_createRule,
  sportsbookui_starzbet_cashOut_title_ruleCreated,
  sportsbookui_starzbet_editCashOut_partialCashOut,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./AutoCashOutForm.module.css";
import { Button } from "../../../../../../../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { RequireCurrencyInput } from "../../../../../../../../../../../../common/Components/Inputs/CurrencyInput";
import { cashOutAddRuleAction, cashOutRemoveRuleAction } from "../../../../../../../../../../../Store/CashOut/CashOutAction";
import { useAutoCashOutReaches } from "../../../../../../../../../../../Store/MyBets/Hooks/UseAutoCashOutReaches";
import { useLimitAutoCashOutReaches } from "../../../../../../../../../../../Store/MyBets/Hooks/UseLimitAutoCashOutReaches";
import { usePartialAutoCashOut } from "../../../../../../../../../../../Store/MyBets/Hooks/UsePartialAutoCashOut";
import { useLimitPartialAutoCashOut } from "../../../../../../../../../../../Store/MyBets/Hooks/UseLimitPartialAutoCashOut";
import { Ellipsis } from "../../../../../../../../../../../Components/Ellipsis/Ellipsis";
import { FoundationBurstIcon } from "../../../../../../../../../../../Components/Icons/FoundationBurstIcon/FoundationBurstIcon";
import { ButtonLoaderIcon } from "../../../../../../../../../../../Components/Icons/ButtonLoaderIcon/ButtonLoaderIcon";
import { MonetizationIcon } from "../../../../../../../Icons/MonetizationIcon/MonetizationIcon";

const ruleState = {
  noRule: "noRule",
  creating: "creating",
  created: "created",
  canceling: "canceling",
  withRule: "withRule",
  removing: "removing",
};

const isWithRule = (state) => state === ruleState.withRule;

const isCreated = (state) => state === ruleState.created;

const isCreating = (state) => state === ruleState.creating;

const isNoRule = (state) => state === ruleState.noRule;

const isRemoving = (state) => state === ruleState.removing;

const useRuleState = (ruleExistence) => {
  const [state, setState] = useState(ruleExistence ? ruleState.withRule : ruleState.noRule);

  const prevRuleExistence = useRef(ruleExistence);

  useEffect(
    // eslint-disable-next-line consistent-return
    () => {
      if (isCreated(state)) {
        const timeout = setTimeout(setState, 1000, ruleState.withRule);

        return () => clearTimeout(timeout);
      }
    },
    [state],
  );

  useEffect(
    () => {
      if (!prevRuleExistence.current && ruleExistence && isCreating(state)) {
        setState(ruleState.created);
      }

      if (prevRuleExistence.current && !ruleExistence && isWithRule(state)) {
        setState(ruleState.noRule);
      }

      prevRuleExistence.current = ruleExistence;
    },
    [ruleExistence, state],
  );

  return [state, setState];
};

const isInvalidate = (validator) => !validator();

const useHandleAddRule = (betId, limitMoney, auto, partialMoney, setState) => {
  const addRule = useAction(cashOutAddRuleAction);

  return useCallback(
    () => {
      addRule(betId, limitMoney, !auto ? partialMoney : null);

      setState(ruleState.creating);
    },
    [addRule, betId, limitMoney, auto, partialMoney, setState],
  );
};

const useHandleRemoveRule = (autoCashOut, setState) => {
  const removeRule = useAction(cashOutRemoveRuleAction);

  return useCallback(
    () => {
      setState(ruleState.removing);

      return removeRule(autoCashOut.id);
    },
    [autoCashOut, removeRule],
  );
};

const useSubmitHandle = (state, validateLimit, validatePartialMoney, handleAddRule) => {
  const isInvalid = useCallback(
    () => [validateLimit, validatePartialMoney].some(isInvalidate),
    [validateLimit, validatePartialMoney],
  );

  return useCallback(
    () => {
      if (!isNoRule(state)) {
        return;
      }

      if (isInvalid()) {
        return;
      }

      handleAddRule();
    },
    [state, handleAddRule, isInvalid],
  );
};

const AutoCashOutButtonText = memo(({ state }) => {
  const [t] = useTranslation();

  switch (state) {
    case ruleState.withRule: {
      return (
        <Ellipsis>
          {t(sportsbookui_starzbet_cashOut_button_cancelRule)}
        </Ellipsis>
      );
    }

    case ruleState.created: {
      return (
        <Ellipsis>
          {t(sportsbookui_starzbet_cashOut_title_ruleCreated)}
        </Ellipsis>
      );
    }

    case ruleState.creating: {
      return (<ButtonLoaderIcon width={18} height={18} />);
    }

    default:
      return (
        <Ellipsis>
          {t(sportsbookui_starzbet_cashOut_button_createRule)}
        </Ellipsis>

      );
  }
});
AutoCashOutButtonText.displayName = "AutoCashOutButtonText";

const AutoForm = memo(({
  state,
  currency,
  limitAmount,
  setLimitAmount,
  submitHandle,
}) => {
  const [t] = useTranslation();

  return (
    <div className={classes.autoForm}>
      <div className={classes.reachTitle}>
        {t(sportsbookui_starzbet_autoCashoutForm_title_autoCashOutIfTheProfitReaches)}
      </div>

      <RequireCurrencyInput
        className={classes.input}
        value={limitAmount}
        onChange={setLimitAmount}
        currency={currency}
        disabled={!isNoRule(state)}
      />

      <Button
        className={classes.createRuleButton}
        colorScheme={"orange-gradient"}
        onClick={submitHandle}
        wide
      >
        <AutoCashOutButtonText
          state={state}
        />
      </Button>
    </div>
  );
});
AutoForm.displayName = "AutoForm";

const PartialForm = memo(({
  state,
  currency,
  limitAmount,
  setLimitAmount,
  submitHandle,
  partialAmount,
  setPartialAmount,
}) => {
  const [t] = useTranslation();

  return (
    <div className={classes.partialForm}>
      <div className={classes.rowInput}>
        <div className={classes.label}>
          <Ellipsis>
            {t(sportsbookui_starzbet_autoCashoutForm_title_ifTheProfitReaches)}
          </Ellipsis>
        </div>

        <RequireCurrencyInput
          className={classes.input}
          value={limitAmount}
          onChange={setLimitAmount}
          currency={currency}
          disabled={!isNoRule(state)}
        />
      </div>

      <div className={classes.rowInput}>
        <div className={classes.label}>
          <Ellipsis>
            {t(sportsbookui_starzbet_editCashOut_partialCashOut)}
          </Ellipsis>
        </div>

        <RequireCurrencyInput
          className={classes.input}
          value={partialAmount}
          onChange={setPartialAmount}
          currency={currency}
        />
      </div>

      <Button colorScheme={"secondary-grey"} className={classes.createRuleButton} onClick={submitHandle}>
        <AutoCashOutButtonText
          state={state}
        />
      </Button>
    </div>
  );
});
PartialForm.displayName = "PartialForm";

const Info = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.info}>
      <FoundationBurstIcon width={35} height={35} color={"active"} />

      {t(sportsbookui_starzbet_autoCashoutForm_title_thisNewFeature, { domain: "Starzbet" })}
    </div>
  );
});
Info.displayName = "Info";

const CashoutLeave = memo(({ autoCashOut }) => {
  const [t] = useTranslation();

  const cashOut = Money.toFormat(autoCashOut.cashOut, EMoneyFormat.symbolLeft);

  const leave = Money.toFormat(Money.subtract(autoCashOut.limit, autoCashOut.cashOut), EMoneyFormat.symbolLeft);

  return (
    t(sportsbookui_starzbet_autoCashoutForm_input_cashOutAmountLeaveAmount, { cashOut, leave })
  );
});
CashoutLeave.displayName = "CashoutLeave";

const ActivatedRule = memo(({ handleRemoveRule, autoCashOut, removing }) => {
  const [t] = useTranslation();

  const auto = Money.isZero(autoCashOut.cashOut);

  return (
    <>
      <div className={classes.activatedMessage}>
        <MonetizationIcon color={"validation"} className={classes.monetizationIcon} />

        <div className={classes.activatedTitle}>
          {
            t(
              auto
                ? sportsbookui_starzbet_autoCashoutForm_title_autoCashOutRuleActive
                : sportsbookui_starzbet_autoCashoutForm_title_partialCashOutRuleActive,
            )
          }
        </div>
      </div>

      <div className={classes.amountAndRemoveButton}>
        <Ellipsis className={classes.input}>
          {
            auto
              ? Money.toFormat(autoCashOut.limit, EMoneyFormat.symbolLeft)
              : <CashoutLeave autoCashOut={autoCashOut} />
          }
        </Ellipsis>

        <Button colorScheme={"error"} onClick={handleRemoveRule} className={classes.removeRuleButton}>
          {
            removing
              ? <ButtonLoaderIcon width={18} height={18} />
              : (
                <Ellipsis>
                  {t(sportsbookui_starzbet_autoCashoutForm_button_removeCashOutRule)}
                </Ellipsis>
              )
          }
        </Button>
      </div>

      <Info />
    </>
  );
});
ActivatedRule.displayName = "ActivatedRule";

const AutoCashOutForm = memo(({
  betId,
  cashOut,
  autoCashOut,
  auto,
}) => {
  const [t] = useTranslation();

  const [limitAmount, limitMoney, setLimitAmount] = useAutoCashOutReaches(betId);

  const limitReaches = useLimitAutoCashOutReaches(betId, limitMoney, setLimitAmount);

  const [partialAmount, partialMoney, setPartialAmount] = usePartialAutoCashOut(betId);

  const [state, setState] = useRuleState(!!autoCashOut);

  const validatePartialMoney = useLimitPartialAutoCashOut(
    betId,
    auto,
    partialMoney,
    setPartialAmount,
  );

  const handleAddRule = useHandleAddRule(betId, limitMoney, auto, partialMoney, setState);

  const handleRemoveRule = useHandleRemoveRule(autoCashOut, setState);

  const submitHandle = useSubmitHandle(state, limitReaches, validatePartialMoney, handleAddRule);

  if ((isWithRule(state) && autoCashOut) || isRemoving(state)) {
    return (
      <ActivatedRule
        handleRemoveRule={handleRemoveRule}
        autoCashOut={autoCashOut}
        removing={isRemoving(state)}
      />
    );
  }

  return (
    <div className={classes.form}>
      <div className={classes.current}>
        <div className={classes.currentText}>{t(sportsbookui_starzbet_autoCashoutForm_title_yourCurrentCashOut)}</div>

        <div className={classes.currentAmount}>
          {Money.toFormat(cashOut, EMoneyFormat.symbolLeft)}
        </div>
      </div>

      {
        auto
          ? (
            <AutoForm
              state={state}
              currency={cashOut.currency}
              limitAmount={limitAmount}
              setLimitAmount={setLimitAmount}
              submitHandle={submitHandle}
            />
          )
          : (
            <PartialForm
              state={state}
              currency={cashOut.currency}
              limitAmount={limitAmount}
              setLimitAmount={setLimitAmount}
              submitHandle={submitHandle}
              partialAmount={partialAmount}
              setPartialAmount={setPartialAmount}
            />
          )
      }

      <Info />
    </div>
  );
});
AutoCashOutForm.displayName = "AutoCashOutForm";

export { AutoCashOutForm };
