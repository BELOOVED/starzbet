import { memo } from "react";
import { clsx } from "clsx";
import { isNotEmpty, withCondition } from "@sb/utils";
import type { TTranslateRecord_Fragment as ITranslateRecord } from "@sb/graphql-client";
import { useTranslation } from "@sb/translator";
import { isNotNilPlayerProfileSelector } from "../../../common/Store/Player/Selectors/ProfileSelectors";
import { TranslateRecord } from "../../../platformui/Components/TranslateRecord/TranslateRecord";
import { useBonusesWithSatisfiedConditionsForSingle } from "./UseBonusesWithSatisfiedConditionsForSingle";
import { useBonusesWithSatisfiedConditionsForParlay } from "./UseBonusesWithSatisfiedConditionsForParlay";

interface ISingleMatchProps<TKey extends string> extends IWithClassName {
  match: { name: ITranslateRecord[]; id: string; }[];
  labelTKey: TKey;
}

const SingleMatch = memo<ISingleMatchProps<string>>(({ match, labelTKey, className }) => {
  const [t] = useTranslation();

  return (
    <div className={className}>
      <div>
        {t(labelTKey)}

        {":"}
      </div>

      <ul>
        {
          match.map(({ name, id }) => (
            <li key={id}>
              <TranslateRecord record={name} />
            </li>
          ))
        }
      </ul>
    </div>
  );
});
SingleMatch.displayName = "SingleMatch";

interface IMatchNotActiveBonusLabelForSingleProps extends IWithClassName {
  outcomeId: string;
}

const matchNotActiveBonusLabelForSingleFactory = <TKey extends string>(
  availableLabelTKey: TKey,
  claimedLabelTKey: TKey,
  baseClassName?: string,
) => withCondition(
    isNotNilPlayerProfileSelector,
    memo<IMatchNotActiveBonusLabelForSingleProps>(({ outcomeId, className }) => {
      const { availableMatch, claimedMatch } = useBonusesWithSatisfiedConditionsForSingle(outcomeId);

      return (
        <>
          {
            isNotEmpty(availableMatch)
              ? (
                <SingleMatch
                  match={availableMatch}
                  className={clsx(className, baseClassName)}
                  labelTKey={availableLabelTKey}
                />
              )
              : null
          }

          {
            isNotEmpty(claimedMatch)
              ? (
                <SingleMatch
                  match={claimedMatch}
                  className={clsx(className, baseClassName)}
                  labelTKey={claimedLabelTKey}
                />
              )
              : null
          }
        </>
      );
    }),
  );

const matchNotActiveBonusLabelForParlayFactory = <TKey extends string>(
  availableLabelTKey: TKey,
  claimedLabelTKey: TKey,
  baseClassName?: string,
) => withCondition(
    isNotNilPlayerProfileSelector,
    memo<IWithClassName>(({ className }) => {
      const { availableMatch, claimedMatch } = useBonusesWithSatisfiedConditionsForParlay();

      return (
        <>
          {
            isNotEmpty(availableMatch)
              ? (
                <SingleMatch
                  match={availableMatch}
                  className={clsx(className, baseClassName)}
                  labelTKey={availableLabelTKey}
                />
              )
              : null
          }

          {
            isNotEmpty(claimedMatch)
              ? (
                <SingleMatch
                  match={claimedMatch}
                  className={clsx(className, baseClassName)}
                  labelTKey={claimedLabelTKey}
                />
              )
              : null
          }
        </>
      );
    }),
  );

export {
  matchNotActiveBonusLabelForSingleFactory,
  matchNotActiveBonusLabelForParlayFactory,
};
