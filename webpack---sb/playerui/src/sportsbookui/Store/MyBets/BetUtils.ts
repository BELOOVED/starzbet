// @ts-nocheck
import { Money } from "@sb/utils";

const computePayoutByFreeBet = (totalPotentialPayout, stake, freebet) => freebet
  ? Money.subtract(totalPotentialPayout, stake)
  : totalPotentialPayout;

export { computePayoutByFreeBet };
