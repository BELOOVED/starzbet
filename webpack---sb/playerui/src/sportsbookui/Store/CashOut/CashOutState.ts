import { type IMoney } from "@sb/utils";

interface IStatusState {
  inProgress: boolean;
  lastError: undefined | string;
  success: boolean;
}

interface IWithCashOutState {
  cashOut: {
    moneyMap: Record<string, IMoney>;
    state: Record<string, IStatusState>;
  };
}

const cashOutState: IWithCashOutState = {
  cashOut: {
    // map where key is bet id and value is cash out money
    moneyMap: {},

    // map where key is bet id  is next object: {inProgress: bool, lastError: "string"}
    state: {},
  },
};

export { cashOutState };

export type { IWithCashOutState, IStatusState };
