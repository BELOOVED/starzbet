enum EBetSlipTab {
  betConstructor = "betConstructor",
  myBets = "myBets",
}

const betSlipTabEnum = {
  betConstructor: "betConstructor",
  myBets: "myBets",
} as const;

type TBetSlipTab = keyof typeof betSlipTabEnum

export { betSlipTabEnum, EBetSlipTab };

export type { TBetSlipTab };
