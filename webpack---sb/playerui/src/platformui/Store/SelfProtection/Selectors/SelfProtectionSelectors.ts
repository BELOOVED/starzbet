import negate from "lodash/fp/negate";
import { EPlatform_SelfProtectionBagKind, EPlatform_SelfProtectionBagType } from "@sb/graphql-client";
import { createPropertySelectors, createSimpleSelector, isNil, Money, sortBy, withParams } from "@sb/utils";
import {
  type TPlatform_CloseAccountBag_Fragment,
  type TPlatform_MaxDepositBag_Fragment,
  type TPlatform_PlayLimitBag_Fragment,
  type TPlatform_SelfExclusionBag_Fragment,
  type TPlatform_SelfProtectionBag_Fragment,
  type TPlatform_SelfProtectionBagBase_Fragment,
  type TPlatform_TimeOutBag_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { selectFormValue } from "@sb/form-new";
import { type TCallPayload } from "@sb/sdk";
import { type call_AddSelfProtectionBagsCommand } from "@sb/sdk/SDKClient/selfprotection";
import { playerCurrencySelector } from "../../../../common/Store/Player/Selectors/PlayerCurrencySelector";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { SELF_PROTECTION_BASE_INITIAL_VALUE, type TSelfProtectionBaseModel, type TSelfProtectionWithAmountModel } from "../Model/SelfProtectionModel";
import { DEPOSIT_LIMIT_FORM } from "../Form/DepositLimit/DepositLimitFormModel";
import { isNoLimit } from "../Model/SelfProtectionInterval";
import { PLAY_LIMIT_FORM } from "../Form/PlayLimit/PlayLimitFormModel";
import { TIME_OUT_FORM } from "../Form/TimeOut/TimeOutFormModel";
import { SELF_EXCLUSION_FORM, type TSelfExclusionFormModel } from "../Form/SelfExclusion/SelfExclusionFormModel";
import { ACCOUNT_CLOSURE_FORM, type TAccountClosureFormModel } from "../Form/AccountClosure/AccountClosureFormModel";
import { REALITY_CHECK_FORM } from "../Form/RealityCheck/RealityCheckFormModel";

const isBag = (currentBagType: EPlatform_SelfProtectionBagType) => ({
  type,
}: {
  type: EPlatform_SelfProtectionBagType;
}) => type === currentBagType;

const findIsBag = (type: EPlatform_SelfProtectionBagType) =>
  (arr: TPlatform_SelfProtectionBag_Fragment[]) => arr.find(isBag(type)) || undefined;

const isNoLimitBag = ({
  payloadKind,
}: {
  payloadKind: EPlatform_SelfProtectionBagKind;
}) => payloadKind === EPlatform_SelfProtectionBagKind.noLimitKind;

const selfProtectionSelector = ({ selfProtection }: TPlatformAppState) => selfProtection;

const selfProtectionSelectors = createPropertySelectors(selfProtectionSelector);

type TBagSelector<T extends TPlatform_SelfProtectionBagBase_Fragment> = () => T | undefined;

const timeOutBagSelector = createSimpleSelector(
  [selfProtectionSelectors.bags],
  findIsBag(EPlatform_SelfProtectionBagType.timeOutBag) as TBagSelector<TPlatform_TimeOutBag_Fragment>,
);

const selfExclusionBagsSelector = createSimpleSelector(
  [selfProtectionSelectors.bags],
  findIsBag(EPlatform_SelfProtectionBagType.selfExclusionBag) as TBagSelector<TPlatform_SelfExclusionBag_Fragment>,
);

const closeAccountBagSelector = createSimpleSelector(
  [selfProtectionSelectors.bags],
  findIsBag(EPlatform_SelfProtectionBagType.closeAccountBag) as TBagSelector<TPlatform_CloseAccountBag_Fragment>,
);

const currentBagSelector = <T extends TPlatform_SelfProtectionBag_Fragment>(
  s: TPlatformAppState,
  bagType: EPlatform_SelfProtectionBagType,
) => sortBy(({ createdAt }) => +createdAt, selfProtectionSelectors.bags(s).filter(isBag(bagType)))[0] as T | undefined;

currentBagSelector.type = <T extends TPlatform_SelfProtectionBag_Fragment>() => currentBagSelector as typeof currentBagSelector<T>;

const nextBagSelector = <T extends TPlatform_SelfProtectionBag_Fragment>(
  s: TPlatformAppState,
  bagType: EPlatform_SelfProtectionBagType,
) => {
  const limitBags = selfProtectionSelectors.bags(s)
    .filter(isBag(bagType))
    .filter(negate(isNoLimitBag));

  if (limitBags.length <= 1) {
    return void 0;
  }

  return sortBy(({ createdAt }) => -createdAt, limitBags)[0] as T | undefined;
};

nextBagSelector.type = <T extends TPlatform_SelfProtectionBag_Fragment>() => nextBagSelector as typeof nextBagSelector<T>;

const activateAtNoLimitSelector = (s: TPlatformAppState, bagType: EPlatform_SelfProtectionBagType) => {
  const limitBags = selfProtectionSelectors.bags(s)
    .filter(isBag(bagType))
    .filter(isNoLimitBag);

  return limitBags[0]?.activateAt;
};

const canAddBagSelector = (s: TPlatformAppState, bagType: EPlatform_SelfProtectionBagType) => {
  const limitBags = selfProtectionSelectors.bags(s).filter(isBag(bagType));

  return limitBags.length < 2;
};

type TSelftProtectionCallPayload = TCallPayload<typeof call_AddSelfProtectionBagsCommand>

/** Deposit Limit **/
const selfProtectionDepositLimitFormInitialValueSelector = createSimpleSelector(
  [
    withParams(currentBagSelector.type<TPlatform_MaxDepositBag_Fragment>(), EPlatform_SelfProtectionBagType.maxDepositBag),
  ],
  (bag): Partial<TSelfProtectionWithAmountModel> => {
    if (isNil(bag) || isNil(bag.period) || isNil(bag.maxDepositPerPeriod)) {
      return SELF_PROTECTION_BASE_INITIAL_VALUE;
    }

    return {
      period: bag.period,
      amount: +Money.toUnit(bag.maxDepositPerPeriod),
    };
  },
);

const selfProtectionDepositLimitCallPayloadSelector = createSimpleSelector(
  [
    withParams(selectFormValue<TSelfProtectionWithAmountModel>, DEPOSIT_LIMIT_FORM),
    playerCurrencySelector,
  ],
  (formState, playerCurrency): TSelftProtectionCallPayload => {
    let bags;

    if (isNoLimit(formState.amount)) {
      bags = [{
        type: EPlatform_SelfProtectionBagType.maxDepositBag,
        payloadKind: EPlatform_SelfProtectionBagKind.noLimitKind,
      }];
    } else {
      const maxDepositPerPeriod = Money.parseAny(formState.amount, playerCurrency);

      bags = [{
        type: EPlatform_SelfProtectionBagType.maxDepositBag,
        payloadKind: EPlatform_SelfProtectionBagKind.maxDepositKind,
        maxDepositPerPeriod,
        period: formState.period,
      }];
    }

    return {
      bags,
      password: formState.password,
    };
  },
);

/** Play Limit **/
const selfProtectionPlayLimitFormInitialValueSelector = createSimpleSelector(
  [
    withParams(currentBagSelector.type<TPlatform_PlayLimitBag_Fragment>(), EPlatform_SelfProtectionBagType.playLimitBag),
  ],
  (bag): Partial<TSelfProtectionWithAmountModel> => {
    if (isNil(bag) || isNil(bag.period) || isNil(bag.sum)) {
      return SELF_PROTECTION_BASE_INITIAL_VALUE;
    }

    return {
      period: bag.period,
      amount: +Money.toUnit(bag.sum),
    };
  },
);

const selfProtectionPlayLimitCallPayloadSelector = createSimpleSelector(
  [
    withParams(selectFormValue<TSelfProtectionWithAmountModel>, PLAY_LIMIT_FORM),
    playerCurrencySelector,
  ],
  (formState, playerCurrency): TSelftProtectionCallPayload => {
    let bags;

    if (isNoLimit(formState.amount)) {
      bags = [{
        type: EPlatform_SelfProtectionBagType.playLimitBag,
        payloadKind: EPlatform_SelfProtectionBagKind.noLimitKind,
      }];
    } else {
      const sum = Money.parseAny(formState.amount, playerCurrency);

      bags = [{
        type: EPlatform_SelfProtectionBagType.playLimitBag,
        payloadKind: EPlatform_SelfProtectionBagKind.playLimitKind,
        sum: sum,
        period: formState.period,
      }];
    }

    return {
      bags,
      password: formState.password,
    };
  },
);

/** Time Out **/
const selfProtectionTimeOutCallPayloadSelector = createSimpleSelector(
  [
    withParams(selectFormValue<TSelfProtectionBaseModel>, TIME_OUT_FORM),
  ],
  (formState): TSelftProtectionCallPayload => ({
    bags: [{
      type: EPlatform_SelfProtectionBagType.timeOutBag,
      payloadKind: EPlatform_SelfProtectionBagKind.timeOutKind,
      expiresIn: formState.period,
    }],
    password: formState.password,
  }),
);

/** Self Exclusion **/
const selfProtectionSelfExclusionCallPayloadSelector = createSimpleSelector(
  [
    withParams(selectFormValue<TSelfExclusionFormModel>, SELF_EXCLUSION_FORM),
  ],
  (formState): TSelftProtectionCallPayload => ({
    bags: isNoLimit(formState.period)
      ? [{
        type: EPlatform_SelfProtectionBagType.selfExclusionBag,
        payloadKind: EPlatform_SelfProtectionBagKind.noLimitKind,
        product: formState.product,
      }]
      : [{
        type: EPlatform_SelfProtectionBagType.selfExclusionBag,
        payloadKind: EPlatform_SelfProtectionBagKind.selfExclusionKind,
        expiresIn: formState.period,
        product: formState.product,
      }],
    password: formState.password,
  }),
);

/** Account Closure **/
const selfProtectionAccountClosureCallPayloadSelector = createSimpleSelector(
  [
    withParams(selectFormValue<TAccountClosureFormModel>, ACCOUNT_CLOSURE_FORM),
  ],
  (formState): TSelftProtectionCallPayload => ({
    bags: [{
      type: EPlatform_SelfProtectionBagType.closeAccountBag,
      payloadKind: EPlatform_SelfProtectionBagKind.closeAccountKind,
      expiresIn: formState.period,
      reason: formState.reason,
    }],
    password: formState.password,
  }),
);

/** Reality check **/
const selfProtectionRealityCheckCallPayloadSelector = createSimpleSelector(
  [
    withParams(selectFormValue<TSelfProtectionBaseModel>, REALITY_CHECK_FORM),
  ],
  (formState): TSelftProtectionCallPayload => ({
    bags: isNoLimit(formState.period)
      ? [{
        type: EPlatform_SelfProtectionBagType.realityCheckByTimeBag,
        payloadKind: EPlatform_SelfProtectionBagKind.noLimitKind,
      }]
      : [{
        type: EPlatform_SelfProtectionBagType.realityCheckByTimeBag,
        payloadKind: EPlatform_SelfProtectionBagKind.realityCheckByTimeKind,
        period: formState.period,
      }],
    password: formState.password,
  }),
);

export {
  timeOutBagSelector,
  selfExclusionBagsSelector,
  currentBagSelector,
  nextBagSelector,
  activateAtNoLimitSelector,
  canAddBagSelector,
  closeAccountBagSelector,

  selfProtectionSelectors,

  selfProtectionDepositLimitFormInitialValueSelector,
  selfProtectionDepositLimitCallPayloadSelector,

  selfProtectionPlayLimitFormInitialValueSelector,
  selfProtectionPlayLimitCallPayloadSelector,

  selfProtectionTimeOutCallPayloadSelector,

  selfProtectionSelfExclusionCallPayloadSelector,

  selfProtectionAccountClosureCallPayloadSelector,

  selfProtectionRealityCheckCallPayloadSelector,
};
