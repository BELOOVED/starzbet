// @ts-nocheck
import { createElement, memo } from "react";
import { EOutcomeKind } from "@sb/betting-core/EOutcomeKind";
import { EMarketParameter } from "@sb/betting-core/EMarketParameter";
import { type EMarketType } from "@sb/betting-core/MarketType";
import { type TExplicitAny, type TTranslateItem, type TTranslateRecord } from "@sb/utils";
import { type TParticipants } from "@sb/betting-core/Feed/Types";
import { type TMarketType } from "../../Store/MyBets/Model/TBet";
import { RangeNormalizer } from "../OutcomeProp/RangeNormalizer";
import { ScoreNormalizer } from "../OutcomeProp/ScoreNormalizer";
import { MultiValueNormalizer } from "../OutcomeProp/MultiValueNormalizer";
import {
  NormalizeForValueSequence,
  NormalizeValueSequenceWithNumberParameters,
} from "../OutcomeProp/ValueSequenceNormalizer";
import { TranslateName } from "../TranslateName/TranslateName";
import { PredicateNormalizer } from "./PredicateNormalizer";
import { mapBaseNormalizer } from "./MapBaseNormalizer";
import { HtftNormalizer } from "./HtftNormalizer";
import { PredicateWithScopeNormalizer } from "./PredicateWithScopeNormalizer";
import { ColorNormalizer } from "./ColorNormalizer";

interface IOutcomeNameProps {
  collapsed?: boolean;
  marketType: EMarketType | TMarketType;
  marketParameters: Record<string, TExplicitAny>;
  outcomeParameters: Record<string, TExplicitAny>;
  participants: TParticipants;
  sportId: string;
  name?: TTranslateRecord | TTranslateItem[] | null;
}

//TODO refact
const OutcomeName = memo<IOutcomeNameProps>(({
  collapsed = false,
  marketType,
  marketParameters,
  sportId,
  outcomeParameters,
  participants,
  name,
}) => {
  const { "@kind": kind, ...parameters } = outcomeParameters;

  if (mapBaseNormalizer[kind]) {
    return createElement(
      mapBaseNormalizer[kind],
      {
        participants,
        marketType,
        sportId,
        collapsed,
        ...parameters,
      },
    );
  }

  switch (kind) {
    case EOutcomeKind.key_id: {
      // todo add team/draw
      return (
        <ScoreNormalizer
          outcomeParameters={parameters}
          participants={participants}
        />
      );
    }

    case EOutcomeKind.value: {
      if (marketParameters.hasOwnProperty(EMarketParameter.scopeType)) {
        return (
          <PredicateWithScopeNormalizer
            outcomeParameters={parameters}
            marketParameters={marketParameters}
            sportId={sportId}
          />
        );
      }

      if (marketParameters.hasOwnProperty(EMarketParameter.color)) {
        return (
          <ColorNormalizer
            outcomeParameters={parameters}
            marketParameters={marketParameters}
          />
        );
      }

      return (
        <PredicateNormalizer
          outcomeParameters={parameters}
        />
      );
    }

    case EOutcomeKind.range: {
      return (
        <RangeNormalizer
          outcomeParameters={parameters}
        />
      );
    }

    case EOutcomeKind.htft: {
      return (
        <HtftNormalizer
          outcomeParameters={parameters}
          participants={participants}
        />
      );
    }

    case EOutcomeKind.multi_value: {
      return (
        <MultiValueNormalizer
          outcomeParameters={parameters}
        />
      );
    }

    case EOutcomeKind.value_sequence: {
      if (marketParameters.hasOwnProperty(EMarketParameter.number)) {
        return (
          <NormalizeValueSequenceWithNumberParameters
            marketParameters={marketParameters}
            outcomeParameters={parameters}
            sportId={sportId}
            collapsed={collapsed}
          />
        );
      }

      return (
        <NormalizeForValueSequence sportId={sportId} outcomeParameters={parameters} collapsed={collapsed} />
      );
    }

    case EOutcomeKind.custom: {
      return <TranslateName name={name} />;
    }

    default:
      return "";
  }
});
OutcomeName.displayName = "OutcomeName";

export { OutcomeName };
