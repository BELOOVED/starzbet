import { type ECurrencyCode, type ELocale, EMoneyFormat, getNotNil, type IMoneyBag, isNil, Money, Time, type TNullable } from "@sb/utils";
import type {
  TPlatform_Bonus_Fragment,
  TPlatform_Bonus_Template_Fragment,
  TPlatform_BonusSize_Fragment,
  TPlatform_BonusSize_Template_Fragment,
  TPlatform_BonusWagering_Fragment,
  TPlatform_BonusWagering_Template_Fragment,
  TPlatform_PlayerBonus_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { EPlatform_BonusTypeEnum } from "@sb/graphql-client";
import { findPlayerMoneyInBag } from "../../../Utils/PlayerMoneyBag";
import { getTranslatedText } from "../../../Components/TranslateRecord/TranslateRecord";
import {
  isBonus,
  isEligibilityDepositRule,
  isEligibilityDepositRuleTemplate,
  isEligibilityProductRule,
  isEligibilityProductRuleTemplate,
  isFreeBetBonusSize,
  isFreeBetBonusSizeTemplate,
  isInternalFreeBetCasinoCriteria,
  isInternalFreeBetGamesCriteria,
  isInternalFreeBetLiveCasinoCriteria,
  isInternalFreeBetSportsbookCriteria,
  isMonetaryBonusSize,
  isPercentageBonusSize,
  isWageringCasinoCriteria,
  isWageringCasinoCriteriaTemplate,
  isWageringGamesCriteria,
  isWageringGamesCriteriaTemplate,
  isWageringLiveCasinoCriteria,
  isWageringLiveCasinoCriteriaTemplate,
  isWageringSportsbookCriteria,
  isWageringSportsbookCriteriaTemplate,
} from "./BonusTypeGuards";

const INCORRECT_TEMPLATE = "<span style='color: red;'>INCORRECT</span>";

const getPlayerMoneyFromBag = (moneyBag: TNullable<IMoneyBag>, playerCurrency: ECurrencyCode) => {
  const playerMoney = findPlayerMoneyInBag(moneyBag, playerCurrency);

  if (isNil(playerMoney)) {
    return INCORRECT_TEMPLATE;
  }

  return Money.toFormat(playerMoney, EMoneyFormat.codeLeft, { grouping: true });
};

const getTurnoverSize = (
  bonusWagering: TPlatform_BonusWagering_Fragment | TPlatform_BonusWagering_Template_Fragment | null,
  bonusSize: TPlatform_BonusSize_Template_Fragment | TPlatform_BonusSize_Fragment,
  playerCurrency: ECurrencyCode,
) => {
  if (!bonusWagering) {
    return INCORRECT_TEMPLATE;
  }

  if (isNil(bonusWagering.multiplier)) {
    // if multiplier is Nil -> wagering.minBonusBalance should exist
    const bonusBalanceToWin = getNotNil(bonusWagering.minBonusBalance, ["getTurnoverSize"], "bonusBalanceToWin");

    return Money.toFormat(
      findPlayerMoneyInBag(bonusBalanceToWin, playerCurrency),
      EMoneyFormat.codeLeft,
    );
  }

  if (isMonetaryBonusSize(bonusSize)) {
    return Money.toFormat(
      Money.multiply(findPlayerMoneyInBag(bonusSize.money, playerCurrency), Number(bonusWagering.multiplier)),
      EMoneyFormat.codeLeft,
    );
  }

  if (isPercentageBonusSize(bonusSize)) {
    return `${bonusSize.percentage * Number(bonusWagering.multiplier)}%`;
  }

  return INCORRECT_TEMPLATE;
};

const bonusTemplateDataSelectorCombiner = (
  bonus: TPlatform_Bonus_Fragment | TPlatform_PlayerBonus_Fragment,
  playerCurrency: ECurrencyCode,
  offset: number,
  locale: ELocale,
  systemLocale: ELocale,
) => {
  const isFreeBetBonus = bonus.bonusType === EPlatform_BonusTypeEnum.externalFreeBet ||
    bonus.bonusType === EPlatform_BonusTypeEnum.internalFreeBet;
  const bonusSize = isBonus(bonus) ? bonus.bonusSize : bonus.bonusBonusSize;
  const bonusSizeAmount = isFreeBetBonusSize(bonusSize) ? bonusSize.amount : bonusSize;
  const winSizeAmount = isBonus(bonus) ? bonus.winSize : bonus.bonusWinSize;
  const bonusWagering = isBonus(bonus) ? bonus.wagering : bonus.bonusWagering;
  const activityPeriodFrom = isBonus(bonus) ? bonus.activityTime?.from : bonus.bonus.activityTime?.from;
  const activityPeriodUntil = isBonus(bonus)
    ? bonus.activityTime?.to
    : bonus.bonus.activityTime?.to;
  const eligibilityRules = isBonus(bonus)
    ? [...bonus.eligibility.claimRules, ...bonus.eligibility.activateRules]
    : [...bonus.eligibilityClaimRules, ...bonus.eligibilityActivateRules];

  const depositRule = eligibilityRules.find(isEligibilityDepositRule);
  const eligibilityProductRules = eligibilityRules.find(isEligibilityProductRule);

  const wageringProductCriteria = bonusWagering?.productRules.map(({ criteria }) => criteria);
  const freeBetProductCriteria = isFreeBetBonusSize(bonusSize)
    ? bonusSize.rule.productRules.map(({ criteria }) => criteria)
    : [];

  const wageringSportsbookCriteria = wageringProductCriteria?.find(isWageringSportsbookCriteria);
  const wageringCasinoCriteria = wageringProductCriteria?.find(isWageringCasinoCriteria);
  const wageringLiveCasinoCriteria = wageringProductCriteria?.find(isWageringLiveCasinoCriteria);
  const wageringGamesCriteria = wageringProductCriteria?.find(isWageringGamesCriteria);

  const freeBetSportsbookCriteria = freeBetProductCriteria.find(isInternalFreeBetSportsbookCriteria);
  const freeBetCasinoCriteria = freeBetProductCriteria.find(isInternalFreeBetCasinoCriteria);
  const freeBetLiveCasinoCriteria = freeBetProductCriteria.find(isInternalFreeBetLiveCasinoCriteria);
  const freeBetGamesCriteria = freeBetProductCriteria.find(isInternalFreeBetGamesCriteria);

  const dynamicData = isNil(eligibilityProductRules)
    ? {}
    : eligibilityProductRules.flatRules.rules
      .filter(({ value }) => !isNil(value))
      .reduce(
        (acc, { ruleId, value: rawValue }) => {
          const value = getNotNil(rawValue, ["bonusTemplateDataSelectorCombiner", "dynamicData"], "flatRules.rules.value");
          const shortId = ruleId.split("-")[0] as string;

          switch (value.__typename) {
            case "Platform_BonusEligibilityCasinoCriteria":
            case "Platform_BonusEligibilityLiveCasinoCriteria":
            case "Platform_BonusEligibilitySportsbookCriteria":
              return {
                ...acc,
                [`({{${shortId}--minStake}})`]: getPlayerMoneyFromBag(value.minStakePerBet, playerCurrency),
              };
            case "Platform_BonusEligibilityTotalCountRuleCriteria":
              return {
                ...acc,
                [`({{${shortId}--count}})`]: value.minimumNumber ?? INCORRECT_TEMPLATE,
              };
            case "Platform_BonusEligibilityTotalTurnoverRuleCriteria":
              switch (value.minimumAmount.__typename) {
                case "Platform_BonusPercentageSize":
                  return {
                    ...acc,
                    [`({{${shortId}--percentage}})`]: value.minimumAmount.percentage ?? INCORRECT_TEMPLATE,
                  };
                case "Platform_BonusMonetarySize":
                  return {
                    ...acc,
                    [`({{${shortId}--amount}})`]: getPlayerMoneyFromBag(value.minimumAmount.money, playerCurrency),
                  };
                default:
                  return acc;
              }
            default:
              return acc;
          }
        },
        {},
      );

  const bonusTitle = isBonus(bonus)
    ? getTranslatedText(bonus.descriptionTitle, locale, systemLocale)
    : getTranslatedText(bonus.bonusDescriptionTitle, locale, systemLocale);

  const staticData = {
    bonusName: isBonus(bonus)
      ? getTranslatedText(bonus.name, locale, systemLocale)
      : getTranslatedText(bonus.bonusName, locale, systemLocale),
    bonusTitle: bonusTitle ?? INCORRECT_TEMPLATE,
    activityPeriodFrom: activityPeriodFrom
      ? Time.formatOrNoop(
        Number(activityPeriodFrom),
        "dd/MM/yyyy HH:mm:ss",
        "-",
        { locale, offset },
      )
      : INCORRECT_TEMPLATE,
    activityPeriodUntil: activityPeriodUntil
      ? Time.formatOrNoop(
        Number(activityPeriodUntil),
        "dd/MM/yyyy HH:mm:ss",
        "-",
        { locale, offset },
      )
      : INCORRECT_TEMPLATE,
    depositMin: getPlayerMoneyFromBag(depositRule?.criteria.minAmount, playerCurrency),
    depositMax: getPlayerMoneyFromBag(depositRule?.criteria.maxAmount, playerCurrency),
    turnoverSize: isFreeBetBonus
      ? INCORRECT_TEMPLATE
      : getTurnoverSize(bonusWagering, bonusSize, playerCurrency),

    bonusSizeMonetary: bonusSizeAmount && isMonetaryBonusSize(bonusSizeAmount)
      ? getPlayerMoneyFromBag(bonusSizeAmount.money, playerCurrency)
      : INCORRECT_TEMPLATE,
    bonusSizePercentageMin: bonusSizeAmount && isPercentageBonusSize(bonusSizeAmount)
      ? getPlayerMoneyFromBag(bonusSizeAmount.minAmount, playerCurrency)
      : INCORRECT_TEMPLATE,
    bonusSizePercentageMax: bonusSizeAmount && isPercentageBonusSize(bonusSizeAmount)
      ? getPlayerMoneyFromBag(bonusSizeAmount.maxAmount, playerCurrency)
      : INCORRECT_TEMPLATE,
    bonusSizePercentage: bonusSizeAmount && isPercentageBonusSize(bonusSizeAmount)
      ? `${bonusSizeAmount.percentage}%`
      : INCORRECT_TEMPLATE,

    winSizeMonetary: winSizeAmount && isMonetaryBonusSize(winSizeAmount)
      ? getPlayerMoneyFromBag(winSizeAmount.money, playerCurrency)
      : INCORRECT_TEMPLATE,
    winSizePercentageMin: winSizeAmount && isPercentageBonusSize(winSizeAmount)
      ? getPlayerMoneyFromBag(winSizeAmount.minAmount, playerCurrency)
      : INCORRECT_TEMPLATE,
    winSizePercentageMax: winSizeAmount && isPercentageBonusSize(winSizeAmount)
      ? getPlayerMoneyFromBag(winSizeAmount.maxAmount, playerCurrency)
      : INCORRECT_TEMPLATE,
    winSizePercentage: winSizeAmount && isPercentageBonusSize(winSizeAmount)
      ? `${winSizeAmount.percentage}%`
      : INCORRECT_TEMPLATE,

    wageringSportsbookMinNumberOfBets: wageringSportsbookCriteria?.minNumberOfBets?.toString() ?? INCORRECT_TEMPLATE,
    wageringSportsbookMinStake: getPlayerMoneyFromBag(wageringSportsbookCriteria?.minStakePerBet, playerCurrency),
    wageringSportsbookMaxStake: getPlayerMoneyFromBag(wageringSportsbookCriteria?.maxStakePerBet, playerCurrency),
    wageringCasinoMinNumberRounds: wageringCasinoCriteria?.minNumberOfBets?.toString() ?? INCORRECT_TEMPLATE,
    wageringCasinoMinStake: getPlayerMoneyFromBag(wageringCasinoCriteria?.minStakePerBet, playerCurrency),
    wageringCasinoMaxStake: getPlayerMoneyFromBag(wageringCasinoCriteria?.maxStakePerBet, playerCurrency),
    wageringLiveCasinoMinNumberRounds: wageringLiveCasinoCriteria?.minNumberOfBets?.toString() ?? INCORRECT_TEMPLATE,
    wageringLiveCasinoMinStake: getPlayerMoneyFromBag(wageringLiveCasinoCriteria?.minStakePerBet, playerCurrency),
    wageringLiveCasinoMaxStake: getPlayerMoneyFromBag(wageringLiveCasinoCriteria?.maxStakePerBet, playerCurrency),
    wageringGamesMinNumberRounds: wageringGamesCriteria?.minNumberOfBets?.toString() ?? INCORRECT_TEMPLATE,
    wageringGamesMinStake: getPlayerMoneyFromBag(wageringGamesCriteria?.minStakePerBet, playerCurrency),
    wageringGamesMaxStake: getPlayerMoneyFromBag(wageringGamesCriteria?.maxStakePerBet, playerCurrency),

    freeBetSportsbookMaxAmountOfBets: freeBetSportsbookCriteria?.maxAmountOfBets?.toString() ?? INCORRECT_TEMPLATE,
    freeBetSportsbookMaxWinAllowed: getPlayerMoneyFromBag(freeBetSportsbookCriteria?.maxWinAllowed, playerCurrency),
    freeBetSportsbookMinimumAmount: getPlayerMoneyFromBag(freeBetSportsbookCriteria?.minValue, playerCurrency),
    freeBetSportsbookMaximumAmount: getPlayerMoneyFromBag(freeBetSportsbookCriteria?.maxValue, playerCurrency),
    freeBetCasinoMaxAmountOfBets: freeBetCasinoCriteria?.maxAmountOfBets?.toString() ?? INCORRECT_TEMPLATE,
    freeBetCasinoMaxWinAllowed: getPlayerMoneyFromBag(freeBetCasinoCriteria?.maxWinAllowed, playerCurrency),
    freeBetCasinoMinimumAmount: getPlayerMoneyFromBag(freeBetCasinoCriteria?.minValue, playerCurrency),
    freeBetCasinoMaximumAmount: getPlayerMoneyFromBag(freeBetCasinoCriteria?.maxValue, playerCurrency),
    freeBetLiveCasinoMaxAmountOfBets: freeBetLiveCasinoCriteria?.maxAmountOfBets?.toString() ?? INCORRECT_TEMPLATE,
    freeBetLiveCasinoMaxWinAllowed: getPlayerMoneyFromBag(freeBetLiveCasinoCriteria?.maxWinAllowed, playerCurrency),
    freeBetLiveCasinoMinimumAmount: getPlayerMoneyFromBag(freeBetLiveCasinoCriteria?.minValue, playerCurrency),
    freeBetLiveCasinoMaximumAmount: getPlayerMoneyFromBag(freeBetLiveCasinoCriteria?.maxValue, playerCurrency),
    freeBetGamesMaxAmountOfBets: freeBetGamesCriteria?.maxAmountOfBets?.toString() ?? INCORRECT_TEMPLATE,
    freeBetGamesMaxWinAllowed: getPlayerMoneyFromBag(freeBetGamesCriteria?.maxWinAllowed, playerCurrency),
    freeBetGamesMinimumAmount: getPlayerMoneyFromBag(freeBetGamesCriteria?.minValue, playerCurrency),
    freeBetGamesMaximumAmount: getPlayerMoneyFromBag(freeBetGamesCriteria?.maxValue, playerCurrency),
  };

  return [staticData, dynamicData] as const;
};

const bonusTemplateDataSelectorCombinerCms = (
  bonus: TPlatform_Bonus_Template_Fragment,
  playerCurrency: ECurrencyCode,
  offset: number,
  locale: ELocale,
  systemLocale: ELocale,
) => {
  const isFreeBetBonus = bonus.bonusType === EPlatform_BonusTypeEnum.externalFreeBet ||
    bonus.bonusType === EPlatform_BonusTypeEnum.internalFreeBet;
  const bonusSize = bonus.bonusSize;
  const bonusSizeAmount = isFreeBetBonusSizeTemplate(bonusSize) ? bonusSize.amount : bonusSize;
  const winSizeAmount = bonus.winSize;
  const bonusWagering = bonus.wagering;
  const activityPeriodFrom = bonus.activityTime?.from;
  const activityPeriodUntil = bonus.activityTime?.to;
  const eligibilityRules = [...bonus.eligibility.claimRules, ...bonus.eligibility.activateRules];

  const depositRule = eligibilityRules.find(isEligibilityDepositRuleTemplate);
  const eligibilityProductRules = eligibilityRules.find(isEligibilityProductRuleTemplate);

  const wageringProductCriteria = bonusWagering?.productRules.map(({ criteria }) => criteria);
  const freeBetProductCriteria = isFreeBetBonusSizeTemplate(bonusSize)
    ? bonusSize.rule.productRules.map(({ criteria }) => criteria)
    : [];

  const wageringSportsbookCriteria = wageringProductCriteria?.find(isWageringSportsbookCriteriaTemplate);
  const wageringCasinoCriteria = wageringProductCriteria?.find(isWageringCasinoCriteriaTemplate);
  const wageringLiveCasinoCriteria = wageringProductCriteria?.find(isWageringLiveCasinoCriteriaTemplate);
  const wageringGamesCriteria = wageringProductCriteria?.find(isWageringGamesCriteriaTemplate);

  const freeBetSportsbookCriteria = freeBetProductCriteria.find(isInternalFreeBetSportsbookCriteria);
  const freeBetCasinoCriteria = freeBetProductCriteria.find(isInternalFreeBetCasinoCriteria);
  const freeBetLiveCasinoCriteria = freeBetProductCriteria.find(isInternalFreeBetLiveCasinoCriteria);
  const freeBetGamesCriteria = freeBetProductCriteria.find(isInternalFreeBetGamesCriteria);

  const dynamicData = isNil(eligibilityProductRules)
    ? {}
    : eligibilityProductRules.flatRules.rules
      .filter(({ value }) => !isNil(value))
      .reduce(
        (acc, { ruleId, value: rawValue }) => {
          const value = getNotNil(rawValue, ["bonusTemplateDataSelectorCombiner", "dynamicData"], "flatRules.rules.value");
          const shortId = ruleId.split("-")[0] as string;

          switch (value.__typename) {
            case "Platform_BonusEligibilityCasinoCriteria":
            case "Platform_BonusEligibilityLiveCasinoCriteria":
            case "Platform_BonusEligibilitySportsbookCriteria":
              return {
                ...acc,
                [`({{${shortId}--minStake}})`]: getPlayerMoneyFromBag(value.minStakePerBet, playerCurrency),
              };
            case "Platform_BonusEligibilityTotalCountRuleCriteria":
              return {
                ...acc,
                [`({{${shortId}--count}})`]: value.minimumNumber ?? INCORRECT_TEMPLATE,
              };
            case "Platform_BonusEligibilityTotalTurnoverRuleCriteria":
              switch (value.minimumAmount.__typename) {
                case "Platform_BonusPercentageSize":
                  return {
                    ...acc,
                    [`({{${shortId}--percentage}})`]: value.minimumAmount.percentage ?? INCORRECT_TEMPLATE,
                  };
                case "Platform_BonusMonetarySize":
                  return {
                    ...acc,
                    [`({{${shortId}--amount}})`]: getPlayerMoneyFromBag(value.minimumAmount.money, playerCurrency),
                  };
                default:
                  return acc;
              }
            default:
              return acc;
          }
        },
        {},
      );

  const bonusTitle = getTranslatedText(bonus.descriptionTitle, locale, systemLocale);

  const staticData = {
    bonusName: getTranslatedText(bonus.name, locale, systemLocale),
    bonusTitle: bonusTitle ?? INCORRECT_TEMPLATE,
    activityPeriodFrom: activityPeriodFrom
      ? Time.formatOrNoop(
        Number(activityPeriodFrom),
        "dd/MM/yyyy HH:mm:ss",
        "-",
        { locale, offset },
      )
      : INCORRECT_TEMPLATE,
    activityPeriodUntil: activityPeriodUntil
      ? Time.formatOrNoop(
        Number(activityPeriodUntil),
        "dd/MM/yyyy HH:mm:ss",
        "-",
        { locale, offset },
      )
      : INCORRECT_TEMPLATE,
    depositMin: getPlayerMoneyFromBag(depositRule?.criteria.minAmount, playerCurrency),
    depositMax: getPlayerMoneyFromBag(depositRule?.criteria.maxAmount, playerCurrency),
    turnoverSize: isFreeBetBonus
      ? INCORRECT_TEMPLATE
      : getTurnoverSize(bonusWagering, bonusSize, playerCurrency),

    bonusSizeMonetary: bonusSizeAmount && isMonetaryBonusSize(bonusSizeAmount)
      ? getPlayerMoneyFromBag(bonusSizeAmount.money, playerCurrency)
      : INCORRECT_TEMPLATE,
    bonusSizePercentageMin: bonusSizeAmount && isPercentageBonusSize(bonusSizeAmount)
      ? getPlayerMoneyFromBag(bonusSizeAmount.minAmount, playerCurrency)
      : INCORRECT_TEMPLATE,
    bonusSizePercentageMax: bonusSizeAmount && isPercentageBonusSize(bonusSizeAmount)
      ? getPlayerMoneyFromBag(bonusSizeAmount.maxAmount, playerCurrency)
      : INCORRECT_TEMPLATE,
    bonusSizePercentage: bonusSizeAmount && isPercentageBonusSize(bonusSizeAmount)
      ? `${bonusSizeAmount.percentage}%`
      : INCORRECT_TEMPLATE,

    winSizeMonetary: winSizeAmount && isMonetaryBonusSize(winSizeAmount)
      ? getPlayerMoneyFromBag(winSizeAmount.money, playerCurrency)
      : INCORRECT_TEMPLATE,
    winSizePercentageMin: winSizeAmount && isPercentageBonusSize(winSizeAmount)
      ? getPlayerMoneyFromBag(winSizeAmount.minAmount, playerCurrency)
      : INCORRECT_TEMPLATE,
    winSizePercentageMax: winSizeAmount && isPercentageBonusSize(winSizeAmount)
      ? getPlayerMoneyFromBag(winSizeAmount.maxAmount, playerCurrency)
      : INCORRECT_TEMPLATE,
    winSizePercentage: winSizeAmount && isPercentageBonusSize(winSizeAmount)
      ? `${winSizeAmount.percentage}%`
      : INCORRECT_TEMPLATE,

    wageringSportsbookMinNumberOfBets: wageringSportsbookCriteria?.minNumberOfBets?.toString() ?? INCORRECT_TEMPLATE,
    wageringSportsbookMinStake: getPlayerMoneyFromBag(wageringSportsbookCriteria?.minStakePerBet, playerCurrency),
    wageringSportsbookMaxStake: getPlayerMoneyFromBag(wageringSportsbookCriteria?.maxStakePerBet, playerCurrency),
    wageringCasinoMinNumberRounds: wageringCasinoCriteria?.minNumberOfBets?.toString() ?? INCORRECT_TEMPLATE,
    wageringCasinoMinStake: getPlayerMoneyFromBag(wageringCasinoCriteria?.minStakePerBet, playerCurrency),
    wageringCasinoMaxStake: getPlayerMoneyFromBag(wageringCasinoCriteria?.maxStakePerBet, playerCurrency),
    wageringLiveCasinoMinNumberRounds: wageringLiveCasinoCriteria?.minNumberOfBets?.toString() ?? INCORRECT_TEMPLATE,
    wageringLiveCasinoMinStake: getPlayerMoneyFromBag(wageringLiveCasinoCriteria?.minStakePerBet, playerCurrency),
    wageringLiveCasinoMaxStake: getPlayerMoneyFromBag(wageringLiveCasinoCriteria?.maxStakePerBet, playerCurrency),
    wageringGamesMinNumberRounds: wageringGamesCriteria?.minNumberOfBets?.toString() ?? INCORRECT_TEMPLATE,
    wageringGamesMinStake: getPlayerMoneyFromBag(wageringGamesCriteria?.minStakePerBet, playerCurrency),
    wageringGamesMaxStake: getPlayerMoneyFromBag(wageringGamesCriteria?.maxStakePerBet, playerCurrency),

    freeBetSportsbookMaxAmountOfBets: freeBetSportsbookCriteria?.maxAmountOfBets?.toString() ?? INCORRECT_TEMPLATE,
    freeBetSportsbookMaxWinAllowed: getPlayerMoneyFromBag(freeBetSportsbookCriteria?.maxWinAllowed, playerCurrency),
    freeBetSportsbookMinimumAmount: getPlayerMoneyFromBag(freeBetSportsbookCriteria?.minValue, playerCurrency),
    freeBetSportsbookMaximumAmount: getPlayerMoneyFromBag(freeBetSportsbookCriteria?.maxValue, playerCurrency),
    freeBetCasinoMaxAmountOfBets: freeBetCasinoCriteria?.maxAmountOfBets?.toString() ?? INCORRECT_TEMPLATE,
    freeBetCasinoMaxWinAllowed: getPlayerMoneyFromBag(freeBetCasinoCriteria?.maxWinAllowed, playerCurrency),
    freeBetCasinoMinimumAmount: getPlayerMoneyFromBag(freeBetCasinoCriteria?.minValue, playerCurrency),
    freeBetCasinoMaximumAmount: getPlayerMoneyFromBag(freeBetCasinoCriteria?.maxValue, playerCurrency),
    freeBetLiveCasinoMaxAmountOfBets: freeBetLiveCasinoCriteria?.maxAmountOfBets?.toString() ?? INCORRECT_TEMPLATE,
    freeBetLiveCasinoMaxWinAllowed: getPlayerMoneyFromBag(freeBetLiveCasinoCriteria?.maxWinAllowed, playerCurrency),
    freeBetLiveCasinoMinimumAmount: getPlayerMoneyFromBag(freeBetLiveCasinoCriteria?.minValue, playerCurrency),
    freeBetLiveCasinoMaximumAmount: getPlayerMoneyFromBag(freeBetLiveCasinoCriteria?.maxValue, playerCurrency),
    freeBetGamesMaxAmountOfBets: freeBetGamesCriteria?.maxAmountOfBets?.toString() ?? INCORRECT_TEMPLATE,
    freeBetGamesMaxWinAllowed: getPlayerMoneyFromBag(freeBetGamesCriteria?.maxWinAllowed, playerCurrency),
    freeBetGamesMinimumAmount: getPlayerMoneyFromBag(freeBetGamesCriteria?.minValue, playerCurrency),
    freeBetGamesMaximumAmount: getPlayerMoneyFromBag(freeBetGamesCriteria?.maxValue, playerCurrency),
  };

  return [staticData, dynamicData] as const;
};

type TStaticData = ReturnType<typeof bonusTemplateDataSelectorCombiner>[0];

const bonusStaticTemplates: Record<keyof TStaticData, RegExp> & { "INCORRECT_TEMPLATE": RegExp; } = {
  INCORRECT_TEMPLATE: /(INCORRECT_TEMPLATE)/g,
  bonusName: /({{bonusName}})/g,
  bonusTitle: /({{bonusTitle}})/g,
  activityPeriodFrom: /({{activityPeriodFrom}})/g,
  activityPeriodUntil: /({{activityPeriodUntil}})/g,
  bonusSizeMonetary: /({{bonusSizeMonetary}})/g,
  bonusSizePercentage: /({{bonusSizePercentage}})/g,
  bonusSizePercentageMin: /({{bonusSizePercentageMin}})/g,
  bonusSizePercentageMax: /({{bonusSizePercentageMax}})/g,
  winSizeMonetary: /({{winSizeMonetary}})/g,
  winSizePercentage: /({{winSizePercentage}})/g,
  winSizePercentageMin: /({{winSizePercentageMin}})/g,
  winSizePercentageMax: /({{winSizePercentageMax}})/g,
  turnoverSize: /({{turnoverSize}})/g,
  depositMin: /({{depositMin}})/g,
  depositMax: /({{depositMax}})/g,

  wageringSportsbookMinNumberOfBets: /({{wageringSportsbookMinNumberOfBets}})/g,
  wageringSportsbookMinStake: /({{wageringSportsbookMinStake}})/g,
  wageringSportsbookMaxStake: /({{wageringSportsbookMaxStake}})/g,
  wageringCasinoMinNumberRounds: /({{wageringCasinoMinNumberRounds}})/g,
  wageringCasinoMinStake: /({{wageringCasinoMinStake}})/g,
  wageringCasinoMaxStake: /({{wageringCasinoMaxStake}})/g,
  wageringLiveCasinoMinNumberRounds: /({{wageringLiveCasinoMinNumberRounds}})/g,
  wageringLiveCasinoMinStake: /({{wageringLiveCasinoMinStake}})/g,
  wageringLiveCasinoMaxStake: /({{wageringLiveCasinoMaxStake}})/g,
  wageringGamesMinNumberRounds: /({{wageringGamesMinNumberRounds}})/g,
  wageringGamesMinStake: /({{wageringGamesMinStake}})/g,
  wageringGamesMaxStake: /({{wageringGamesMaxStake}})/g,

  freeBetSportsbookMaxAmountOfBets: /({{freeBetSportsbookMaxAmountOfBets}})/g,
  freeBetSportsbookMaxWinAllowed: /({{freeBetSportsbookMaxWinAllowed}})/g,
  freeBetSportsbookMinimumAmount: /({{freeBetSportsbookMinimumAmount}})/g,
  freeBetSportsbookMaximumAmount: /({{freeBetSportsbookMaximumAmount}})/g,
  freeBetCasinoMaxAmountOfBets: /({{freeBetCasinoMaxAmountOfBets}})/g,
  freeBetCasinoMaxWinAllowed: /({{freeBetCasinoMaxWinAllowed}})/g,
  freeBetCasinoMinimumAmount: /({{freeBetCasinoMinimumAmount}})/g,
  freeBetCasinoMaximumAmount: /({{freeBetCasinoMaximumAmount}})/g,
  freeBetLiveCasinoMaxAmountOfBets: /({{freeBetLiveCasinoMaxAmountOfBets}})/g,
  freeBetLiveCasinoMaxWinAllowed: /({{freeBetLiveCasinoMaxWinAllowed}})/g,
  freeBetLiveCasinoMinimumAmount: /({{freeBetLiveCasinoMinimumAmount}})/g,
  freeBetLiveCasinoMaximumAmount: /({{freeBetLiveCasinoMaximumAmount}})/g,
  freeBetGamesMaxAmountOfBets: /({{freeBetGamesMaxAmountOfBets}})/g,
  freeBetGamesMaxWinAllowed: /({{freeBetGamesMaxWinAllowed}})/g,
  freeBetGamesMinimumAmount: /({{freeBetGamesMinimumAmount}})/g,
  freeBetGamesMaximumAmount: /({{freeBetGamesMaximumAmount}})/g,
};

const bonusIncorrectDynamicTemplates = {
  inCorrectDynamic1: /({{[0-9a-f]{8}--minStake}})/g,
  inCorrectDynamic2: /({{[0-9a-f]{8}--count}})/g,
  inCorrectDynamic3: /({{[0-9a-f]{8}--amount}})/g,
  inCorrectDynamic4: /({{[0-9a-f]{8}--percentage}})/g,
};

const replaceTemplateValues = (
  note: string,
  staticData: TStaticData,
  dynamicData: Record<string, string>,
): string => {
  let replaced = note;

  Object
    .entries(bonusStaticTemplates)
    .forEach((pair) => {
      const [key, regExp] = pair as [key: keyof TStaticData, regExp: RegExp];
      replaced = replaced.replace(regExp, staticData[key]);
    });

  Object
    .entries(dynamicData)
    .forEach(([key, value]) => {
      replaced = replaced.replace(new RegExp(key, "g"), value);
    });

  Object
    .values(bonusIncorrectDynamicTemplates)
    .forEach((regExp) => {
      replaced = replaced.replace(regExp, INCORRECT_TEMPLATE);
    });

  return replaced;
};

export {
  bonusTemplateDataSelectorCombiner,
  bonusTemplateDataSelectorCombinerCms,
  replaceTemplateValues,
};
