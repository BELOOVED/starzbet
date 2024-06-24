import { createSimpleSelector, getNotNil, isNotEmpty } from "@sb/utils";
import { platformBonusesSelectors } from "./BonusesSelectors";
import { registrationBonusesWasSucceededSelector } from "./BonusCallManagerSelectors";

const initialRegistrationBonusSelector = createSimpleSelector(
  [platformBonusesSelectors.registrationBonuses],
  (bonuses) => bonuses[0],
);

const initialRegistrationBonusNotNilSelector = createSimpleSelector(
  [initialRegistrationBonusSelector],
  (bonus) => getNotNil(bonus, ["initialRegistrationBonusNotNilSelector"], "registrationBonuses"),
);

const initialRegistrationBonusNameNotNilSelector = createSimpleSelector(
  [initialRegistrationBonusNotNilSelector],
  (bonus) => bonus.name,
);

const isRegistrationBonusesLoadedAndNotEmpty = createSimpleSelector(
  [
    registrationBonusesWasSucceededSelector,
    platformBonusesSelectors.registrationBonuses,
  ],
  (wasSucceeded, bonuses) => wasSucceeded && isNotEmpty(bonuses),
);

export {
  initialRegistrationBonusNameNotNilSelector,
  isRegistrationBonusesLoadedAndNotEmpty,
};
