import { createContext, useContext } from "react";

interface IBonusItemContext {
  bonusId: string;
  forAvailable: boolean;
}

const BonusItemContext = createContext<IBonusItemContext>(null);

const useBonusItemContext = () => useContext(BonusItemContext);

export { BonusItemContext, useBonusItemContext };
