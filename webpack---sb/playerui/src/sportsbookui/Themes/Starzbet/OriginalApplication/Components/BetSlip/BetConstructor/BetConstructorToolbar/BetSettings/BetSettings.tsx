// @ts-nocheck

import clsx from "clsx";
import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_betSettings_title,
  sportsbookui_starzbet_betSlip_betSettings_title_acceptAnyOdds,
  sportsbookui_starzbet_betSlip_betSettings_title_acceptHigherOdds,
  sportsbookui_starzbet_betSlip_betSettings_title_defaultStakeChangeAmount,
  sportsbookui_starzbet_betSlip_betSettings_title_dontAcceptOddsChanges,
  sportsbookui_starzbet_betSlip_button_close,
  sportsbookui_starzbet_betSlip_button_saveChanges,
  sportsbookui_starzbet_betSlip_title_theChangeYouMadeInYourBetSettings,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useActionWithBind } from "@sb/utils";
import classes from "./BetSettings.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { When } from "../../../../../../../../../common/Components/When";
import { ThemedModal } from "../../../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModal";
import {
  ThemedModalHeader,
} from "../../../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModalHeader/ThemedModalHeader";
import {
  ThemedModalText,
} from "../../../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModalText/ThemedModalText";
import {
  ThemedModalBody,
} from "../../../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModalBody/ThemedModalBody";
import {
  ThemedModalButtonsRow,
} from "../../../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModalButtonsRow/ThemedModalButtonsRow";
import { Button } from "../../../../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { BaseModalComponent } from "../../../../../../../../../common/Components/BaseModalComponent/BaseModalComponent";
import { useModalCloseAction } from "../../../../../../../../../common/Store/Modal/Hooks/UseModalCloseAction";
import { EModal } from "../../../../../../../../../common/Store/Modal/Model/EModal";
import { betStrategies, EBetStrategy } from "../../../../../../../../Store/BetStrategy/Model/EBetStrategy";
import { betStrategySelector } from "../../../../../../../../Store/BetStrategy/Selectors/BetStrategySelectors";
import { changeStakeAmountSelector } from "../../../../../../../../Store/BetSlip/Selectors/BetSlipSelectors";
import { useBetSlipChangeDefaultAmountAction } from "../../../../../../../../Store/BetSlip/Hooks/UseBetSlipChangeDefaultAmountAction";
import { betStrategyChangeAction } from "../../../../../../../../Store/BetStrategy/BetStrategyActions";
import { Ellipsis } from "../../../../../../../../Components/Ellipsis/Ellipsis";
import { WarningIcon } from "../../../../Icons/WarningIcon/WarningIcon";
import { CircleCheck } from "../../../CircleCheck/CircleCheck";
import { StakeInputForSettings } from "../../BetConstructorBottom/StakeInput/StakeInput";

const strategyTkeys = {
  [EBetStrategy.any]: sportsbookui_starzbet_betSlip_betSettings_title_acceptAnyOdds,
  [EBetStrategy.higher]: sportsbookui_starzbet_betSlip_betSettings_title_acceptHigherOdds,
  [EBetStrategy.ask]: sportsbookui_starzbet_betSlip_betSettings_title_dontAcceptOddsChanges,
};

const Radio = memo(({
  strategy,
  current,
  setStrategy,
}) => {
  const [t] = useTranslation();

  const changeHandler = useCallback(
    () => setStrategy(strategy),
    [strategy],
  );

  return (
    <div className={classes.radioGroup} onClick={changeHandler}>
      <CircleCheck checked={current} />

      <Ellipsis className={classes.radioText}>
        {t(strategyTkeys[strategy])}
      </Ellipsis>
    </div>
  );
});
Radio.displayName = "Radio";

const Buttons = memo(({ closeHandler, saveHandler, changed }) => {
  const [t] = useTranslation();

  return (
    <ThemedModalButtonsRow className={clsx(classes.buttonsRow, IS_MOBILE_CLIENT_SIDE && classes.mobile)}>
      <When condition={!IS_MOBILE_CLIENT_SIDE}>
        <Button
          className={classes.button}
          colorScheme={"secondary-grey"}
          onClick={closeHandler}
          wide
        >
          <Ellipsis>
            {t(sportsbookui_starzbet_betSlip_button_close)}
          </Ellipsis>
        </Button>
      </When>

      <Button
        disabled={!changed}
        className={classes.button}
        colorScheme={"orange-gradient"}
        onClick={saveHandler}
        wide
      >
        <Ellipsis>
          {t(sportsbookui_starzbet_betSlip_button_saveChanges)}
        </Ellipsis>
      </Button>
    </ThemedModalButtonsRow>
  );
});
Buttons.displayName = "Buttons";

const Warning = memo(({ changed }) => {
  const [t] = useTranslation();

  return (
    <When condition={changed}>
      <div className={classes.warnWrapper}>
        <WarningIcon size={"m"} />

        <div className={classes.warn}>
          {t(sportsbookui_starzbet_betSlip_title_theChangeYouMadeInYourBetSettings)}
        </div>
      </div>
    </When>
  );
});
Warning.displayName = "Warning";

const BetSettingsContent = memo(() => {
  const [t] = useTranslation();

  const [changed, setChanged] = useState(false);

  const betStrategy = useSelector(betStrategySelector);

  const [strategy, setStrategy] = useState(betStrategy);

  const changeStakeAmount = useSelector(changeStakeAmountSelector);

  const [input, setInput] = useState(changeStakeAmount.toString());

  const [amount, setAmount] = useState(changeStakeAmount);

  const closeHandler = useModalCloseAction(EModal.betSettings);

  const changeDefaultAmount = useBetSlipChangeDefaultAmountAction();

  const changeBetStrategy = useActionWithBind(betStrategyChangeAction, strategy);

  useEffect(
    () => {
      setChanged(betStrategy !== strategy || amount !== changeStakeAmount);
    },
    [betStrategy, strategy, amount, changeStakeAmount],
  );

  const changeHandle = useCallback(
    (amount: any, input: any) => {
      setAmount(Number(amount));

      setInput(input);
    },
    [],
  );

  const saveHandler = useCallback(
    () => {
      if (!changed) {
        return;
      }

      changeDefaultAmount(amount);
      changeBetStrategy();
      closeHandler();
    },
    [amount, changed],
  );

  return (
    <>
      <div className={classes.radioWrapper}>
        {
          betStrategies.map((st) => (
            <Radio
              key={st}
              strategy={st}
              current={strategy === st}
              setStrategy={setStrategy}
            />
          ))
        }
      </div>

      <div className={classes.separator} />

      <div className={classes.stakeWrapper}>
        <Ellipsis className={classes.stakeText}>
          {t(sportsbookui_starzbet_betSlip_betSettings_title_defaultStakeChangeAmount)}
        </Ellipsis>

        <div className={classes.input}>
          <StakeInputForSettings value={input} onChange={changeHandle} />
        </div>
      </div>

      <Warning changed={changed} />

      <Buttons closeHandler={closeHandler} saveHandler={saveHandler} changed={changed} />
    </>
  );
});
BetSettingsContent.displayName = "BetSettingsContent";

const BetSettings = memo(() => {
  const [t] = useTranslation();
  const closeHandler = useModalCloseAction(EModal.betSettings);

  return IS_MOBILE_CLIENT_SIDE
    ? (
      <BaseModalComponent onCancel={closeHandler}>
        <div className={classes.betSettingsMobile}>
          <ThemedModalHeader closeButtonClickHandler={closeHandler}>
            <ThemedModalText size={"lg"}>
              {t(sportsbookui_starzbet_betSettings_title)}
            </ThemedModalText>
          </ThemedModalHeader>

          <ThemedModalBody className={classes.body}>
            <BetSettingsContent />
          </ThemedModalBody>
        </div>
      </BaseModalComponent>
    )
    : (
      <ThemedModal onCancel={closeHandler} className={classes.betSettings}>
        <ThemedModalHeader closeButtonClickHandler={closeHandler}>
          <ThemedModalText size={"lg"}>
            {t(sportsbookui_starzbet_betSettings_title)}
          </ThemedModalText>
        </ThemedModalHeader>

        <ThemedModalBody className={classes.body}>
          <BetSettingsContent />
        </ThemedModalBody>
      </ThemedModal>
    );
});
BetSettings.displayName = "BetSettings";

export { BetSettings };
