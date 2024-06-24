import { EWhere_Predicate } from "@sb/graphql-client";
import { type TWhere } from "./TBet";

const betWhereExtension = {
  bet__generalState: "bet__generalState",
  bet__createdAt: "bet__createdAt",
  bet__playerId: "bet__playerId",
} as const;

const getTypeFilterBetWhereExtension = (value: string) => ({
  predicate: EWhere_Predicate.eq,
  fieldPath: betWhereExtension.bet__generalState,
  value,
});

const getCreatedAtBetWhereExtension = (value: number, predicate: EWhere_Predicate) => ({
  predicate,
  value: value.toString(),
  fieldPath: betWhereExtension.bet__createdAt,
});

const getPlayerIdWhereExtension = (value: string) => ({
  predicate: EWhere_Predicate.eq,
  value,
  fieldPath: betWhereExtension.bet__playerId,
});

const isCreatedAtWhereExtension = ({ fieldPath }: TWhere) => fieldPath === betWhereExtension.bet__createdAt;

type TBetWhereExtension = typeof betWhereExtension[keyof typeof betWhereExtension]

export {
  betWhereExtension,
  getTypeFilterBetWhereExtension,
  getCreatedAtBetWhereExtension,
  isCreatedAtWhereExtension,
  getPlayerIdWhereExtension,
};
export type  { TBetWhereExtension };
