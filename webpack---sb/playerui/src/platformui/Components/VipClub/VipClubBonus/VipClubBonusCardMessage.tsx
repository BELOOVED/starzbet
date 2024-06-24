import { type CSSProperties, Fragment, memo } from "react";
import { useSelector } from "react-redux";
import { useParamSelector } from "@sb/utils";
import {
  type TPlatform_BonusBonusLimitMatchResult_Fragment,
  type TPlatform_BonusPassiveMatchResult_Fragment,
  type TPlatform_BonusWithDepositMatchResult_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { useTranslation } from "@sb/translator";
import { type EPlatform_BonusLastDepositsPeriodEnum } from "@sb/graphql-client";
import { vipClubPlayerLevelRulePassivePointsSelector } from "../../../Store/VipClub/Selectors/VipClubLevelRulesSelectors";
import { EVipClubBonusType } from "../../../Store/VipClub/VipClubModels";
import { vipClubFormatMoneyToString } from "../../../Utils/VipClubPointsFormatter";
import { availableBonusByIdNotNilSelectors } from "../../../Store/Bonuses/Selectors/BonusesSelectors";

const style: CSSProperties = {
  color: "var(--warning)",
};

interface IMessageProps<TKeys> {
  bonusType?: EVipClubBonusType;
  tKeys: TKeys;
}

interface IPassiveMessageTKeys {
  common: string;
}

const PassiveMessage = memo<TPlatform_BonusPassiveMatchResult_Fragment & IMessageProps<IPassiveMessageTKeys>>(({ tKeys }) => {
  const points = useSelector(vipClubPlayerLevelRulePassivePointsSelector);
  const [t] = useTranslation();

  return <span style={style}>{t(tKeys.common, { points })}</span>;
});
PassiveMessage.displayName = "PassiveMessage";

interface IWithDepositMessageTKeys {
  common: string;
  atLeastOneDeposit: string;
  minSum: string;
  maxSum: string;
  depositPeriod: Record<EPlatform_BonusLastDepositsPeriodEnum, string>;
}

const WithDepositMessage = memo<TPlatform_BonusWithDepositMatchResult_Fragment & IMessageProps<IWithDepositMessageTKeys>>(({
  lastDepositsPeriod,
  minDepositsSum,
  maxDepositsSum,
  tKeys,
}) => {
  const [t] = useTranslation();

  const messages = [];

  if (minDepositsSum === null && maxDepositsSum === null) {
    messages.push(t(tKeys.atLeastOneDeposit));
  }

  if (minDepositsSum !== null) {
    messages.push(
      t(tKeys.minSum, { minSum: vipClubFormatMoneyToString(minDepositsSum) }),
    );
  }

  if (maxDepositsSum !== null) {
    messages.push(
      t(tKeys.maxSum, { maxSum: vipClubFormatMoneyToString(maxDepositsSum) }),
    );
  }

  if (lastDepositsPeriod !== null) {
    messages.push(t(tKeys.depositPeriod[lastDepositsPeriod]));
  }

  return (
    <span style={style}>
      <span>{t(tKeys.common)}</span>

      <br />

      <ul>
        {
          messages.map((it, i) => (
            <li key={i}>
              {"- "}

              {it}
            </li>
          ))
        }
      </ul>
    </span>
  );
});
WithDepositMessage.displayName = "WithDepositMessage";

interface IBonusLimitMessageTKeys {
  common: string;
  birthday: string;
}

const BonusLimitMessage = memo<TPlatform_BonusBonusLimitMatchResult_Fragment & IMessageProps<IBonusLimitMessageTKeys>>(({
  tKeys,
  bonusType,
}) => {
  const [t] = useTranslation();

  return <span style={style}>{t(bonusType === EVipClubBonusType.birthday ? tKeys.birthday : tKeys.common)}</span>;
});
BonusLimitMessage.displayName = "BonusLimitMessage";

interface IVipClubBonusCardMessageTKeys {
  passiveMessage: IPassiveMessageTKeys;
  withDepositMessage: IWithDepositMessageTKeys;
  bonusLimitMessage: IBonusLimitMessageTKeys;
}

interface IVipClubBonusCardMessageProps extends IWithId {
  bonusType: EVipClubBonusType;
  tKeys: IVipClubBonusCardMessageTKeys;
}

const VipClubBonusCardMessage = memo<IVipClubBonusCardMessageProps>(({
  id,
  tKeys,
  bonusType,
}) => {
  const validationMatchResults = useParamSelector(availableBonusByIdNotNilSelectors.invalidatedMatchResults, [id]);

  return (
    <>
      {
        validationMatchResults.map((match, i) => {
          switch (match.__typename) {
            case "Platform_BonusPassiveMatchResult":
              return <PassiveMessage tKeys={tKeys.passiveMessage} {...match} key={i} />;
            case "Platform_BonusWithDepositMatchResult":
              return <WithDepositMessage tKeys={tKeys.withDepositMessage} {...match} key={i} />;
            case "Platform_BonusVipClubLimitMatchResult":
              return Fragment;
            case "Platform_BonusBonusLimitMatchResult":
              return (
                <BonusLimitMessage
                  tKeys={tKeys.bonusLimitMessage}
                  {...match}
                  bonusType={bonusType}
                  key={i}
                />
              );
            default:
              return Fragment;
          }
        })
      }
    </>
  );
});
VipClubBonusCardMessage.displayName = "VipClubBonusCardMessage";

export { VipClubBonusCardMessage, type IVipClubBonusCardMessageTKeys };
