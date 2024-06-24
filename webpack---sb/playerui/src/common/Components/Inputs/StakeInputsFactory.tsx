import { type ComponentType, memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { getNotNil } from "@sb/utils";
import { changeStakeAmountSelector, multipleSingleInputSelector } from "../../../sportsbookui/Store/BetSlip/Selectors/BetSlipSelectors";
import { useSingleStakeByIdSelector } from "../../../sportsbookui/Store/BetSlip/Hooks/UseSingleStakeByIdSelector";
import { useBetSlipChangeBetAction } from "../../../sportsbookui/Store/BetSlip/Hooks/UseBetSlipChangeBetAction";
import { singleHash } from "../../../sportsbookui/Store/BetSlip/Model/BetHash";
import { useStakeInputForGroupParams } from "../../../sportsbookui/Store/BetSlip/Hooks/UseStakeInputForGroupParams";
import { useChangeMultipleSingleAction } from "../../../sportsbookui/Store/BetSlip/Hooks/UseChangeMultipleSingleAction";
import { getNumericValue } from "../../Utils/GetNumericValue";
import { type IMaybeWithStyle } from "../../IWith";
import { type TNumericInputOnChange } from "./NumericInput";
import { type TNumericInputValue } from "./TNumericInputValue";

interface IStakeInputProps extends IMaybeWithStyle, IWithClassName {
  onChange: TNumericInputOnChange;
  value: TNumericInputValue;
  decrementHandler: VoidFunction;
  incrementHandler: VoidFunction;
}

type TStakeInput = ComponentType<IStakeInputProps>

interface IWithDecrementIncrementProps extends IMaybeWithStyle, IWithClassName {
  StakeInput: TStakeInput;
  onChange: TNumericInputOnChange;
  value: TNumericInputValue;
  changeStakeAmount: number;
}

const WithDecrementIncrement = memo<IWithDecrementIncrementProps>(({
  StakeInput,
  onChange,
  value,
  changeStakeAmount,
  className,
  style,
}) => {
  const decrementHandler = useCallback(
    () => {
      const numericStringValue = value ? getNumericValue(value) : "0";

      const valueAsNumber = parseFloat(numericStringValue);

      const newAmount = Math.max(0, valueAsNumber - changeStakeAmount);

      onChange(newAmount.toString(), newAmount);
    },
    [onChange, changeStakeAmount, value],
  );

  const incrementHandler = useCallback(
    () => {
      const numericStringValue = value ? getNumericValue(value) : "0";

      const valueAsNumber = parseFloat(numericStringValue);

      const newAmount = valueAsNumber + changeStakeAmount;

      onChange(newAmount.toString(), newAmount);
    },
    [onChange, changeStakeAmount, value],
  );

  return (
    <StakeInput
      onChange={onChange}
      value={value}
      decrementHandler={decrementHandler}
      incrementHandler={incrementHandler}
      className={className}
      style={style}
    />
  );
});
WithDecrementIncrement.displayName = "WithDecrementIncrement";

interface IWithChangeStakeAmountProps extends IMaybeWithStyle, IWithClassName {
  StakeInput: TStakeInput;
  onChange: TNumericInputOnChange;
  value: TNumericInputValue;
}

const WithChangeStakeAmount = memo<IWithChangeStakeAmountProps>(({
  StakeInput,
  onChange,
  value,
  style,
  className,
}) => {
  const changeStakeAmount = useSelector(changeStakeAmountSelector);

  return (
    <WithDecrementIncrement
      StakeInput={StakeInput}
      onChange={onChange}
      value={value}
      changeStakeAmount={changeStakeAmount}
      style={style}
      className={className}
    />
  );
});
WithChangeStakeAmount.displayName = "WithChangeStakeAmount";

interface IStakeInputForSingleProps extends IWithClassName, IMaybeWithStyle {
  outcomeId: string;
}

const createStakeInputForSingle = (StakeInput: TStakeInput) => memo<IStakeInputForSingleProps>(({ outcomeId, style, className }) => {
  const { input: value } = getNotNil(
    useSingleStakeByIdSelector(outcomeId),
    ["createStakeInputForSingle"],
    "useSingleStakeByIdSelector",
  );

  const onChange = useBetSlipChangeBetAction(singleHash, outcomeId);

  return (
    <WithChangeStakeAmount
      value={value}
      onChange={onChange}
      StakeInput={StakeInput}
      style={style}
      className={className}
    />
  );
});

const createStakeInputForGroup = (StakeInput: TStakeInput) => memo<IWithClassName & IMaybeWithStyle>(({ style, className }) => {
  const { input, changeHandle } = useStakeInputForGroupParams();

  return (
    <WithChangeStakeAmount
      value={input}
      onChange={changeHandle}
      StakeInput={StakeInput}
      style={style}
      className={className}
    />
  );
});

const createStakeInputForMultipleSingle = (StakeInput: TStakeInput) => memo<IMaybeWithStyle & IWithClassName>(({ style, className }) => {
  const value = useSelector(multipleSingleInputSelector);

  const onChange = useChangeMultipleSingleAction();

  return (
    <WithChangeStakeAmount
      value={value}
      onChange={onChange}
      StakeInput={StakeInput}
      style={style}
      className={className}
    />
  );
});

interface IStakeInputForSettingsProps extends IMaybeWithStyle, IWithClassName {
  onChange: TNumericInputOnChange;
  value: TNumericInputValue;
}

const createStakeInputForSettings = (StakeInput: TStakeInput) => memo<IStakeInputForSettingsProps>(({
  onChange,
  value,
  style,
  className,
}) => (
  <WithDecrementIncrement
    StakeInput={StakeInput}
    onChange={onChange}
    value={value}
    changeStakeAmount={1}
    style={style}
    className={className}
  />
));

const stakeInputsFactory = (StakeInput: TStakeInput) => ({
  StakeInputForSingle: createStakeInputForSingle(StakeInput),
  StakeInputForGroup: createStakeInputForGroup(StakeInput),
  StakeInputForSettings: createStakeInputForSettings(StakeInput),
  StakeInputForMultipleSingle: createStakeInputForMultipleSingle(StakeInput),
});

export { stakeInputsFactory };
export type { IStakeInputProps };
