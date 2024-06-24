import { createPropertySelectors, createSimpleSelector, isNotNil, Money, type TSelector } from "@sb/utils";
import { type IWithRouterState } from "@sb/router";
import {
  type IBonusCanceledPayload,
  type IBonusCompletedPayload,
  type IBonusLostPayload,
  type IBonusWonPayload,
  type TBonusActivatedPayload,
} from "../../Model/BonusWebSocketEvents";
import { anyBonusMatchedSelector } from "../PlayGamePage/Selectors/BonusMatchedWithGameSelectors";
import { type IWithPlatformBonusesState } from "../Bonuses/BonusesInitialState";
import { type TWithGamesState } from "../Games/GamesInitialState";
import { type IWithBonusEvents } from "./BonusEventsInitialState";

const bonusEventSelector = ({ bonusEvent }: IWithBonusEvents) => bonusEvent;

const bonusEventsSelectors = createPropertySelectors(bonusEventSelector);

type TEventFactorySelector = TSelector<
  IWithBonusEvents,
  IBonusCanceledPayload | IBonusCompletedPayload | IBonusLostPayload | IBonusWonPayload | TBonusActivatedPayload | null
>

const eventModalShowSelectorFactory = (selector: TEventFactorySelector) => createSimpleSelector(
  [selector, anyBonusMatchedSelector],
  (event, bonus) => {
    if (!event) {
      return null;
    }

    return {
      condition: event.playerBonusId === bonus?.id,
      shouldBeShow: event.shouldBeShown,
    };
  },
);

type TConditionSelector = TSelector<IWithBonusEvents & TWithGamesState & IWithPlatformBonusesState & IWithRouterState, {
  condition: boolean;
  shouldBeShow: boolean;
} | null>;

const commonShowModalSelectorFactory = (selector: TConditionSelector) =>
  createSimpleSelector([selector], (obj) => !!obj?.shouldBeShow && !obj.condition);

const gameShowModalSelectorFactory = (selector: TConditionSelector) =>
  createSimpleSelector([selector], (obj) => obj?.condition === true);

const showBonusActivatedModal = eventModalShowSelectorFactory(bonusEventsSelectors.playerBonusHasBeenActivated);
const showBonusCancelModal = eventModalShowSelectorFactory(bonusEventsSelectors.playerBonusHasBeenCanceled);
const showBonusLostModal = eventModalShowSelectorFactory(bonusEventsSelectors.playerBonusHasBeenLost);
const showBonusWonModal = eventModalShowSelectorFactory(bonusEventsSelectors.playerBonusHasBeenWon);
const showBonusCompletedModal = eventModalShowSelectorFactory(bonusEventsSelectors.playerBonusHasBeenCompleted);
const showBonusProceededToWageringModal = eventModalShowSelectorFactory(bonusEventsSelectors.playerBonusProceededToWageringStage);

const showCommonBonusActivatedModalSelector = commonShowModalSelectorFactory(showBonusActivatedModal);
const showGameBonusActivatedModalSelector = gameShowModalSelectorFactory(showBonusActivatedModal);

const showCommonBonusCancelModalSelector = commonShowModalSelectorFactory(showBonusCancelModal);
const showGameBonusCancelModalSelector = gameShowModalSelectorFactory(showBonusCancelModal);

const showCommonBonusLostModalSelector = commonShowModalSelectorFactory(showBonusLostModal);
const showGameBonusLostModalSelector = gameShowModalSelectorFactory(showBonusLostModal);

const showCommonBonusWonModalSelector = commonShowModalSelectorFactory(showBonusWonModal);
const showGameBonusWonModalSelector = gameShowModalSelectorFactory(showBonusWonModal);

const showCommonBonusCompletedModalSelector = commonShowModalSelectorFactory(showBonusCompletedModal);
const showGameBonusCompletedModalSelector = gameShowModalSelectorFactory(showBonusCompletedModal);

const showGameBonusProceededToWageringModalSelector = gameShowModalSelectorFactory(showBonusProceededToWageringModal);

const isBonusEventReceivedSelector = createSimpleSelector(
  [
    showGameBonusActivatedModalSelector,
    showGameBonusCancelModalSelector,
    showGameBonusLostModalSelector,
    showGameBonusWonModalSelector,
    showGameBonusCompletedModalSelector,
    showGameBonusProceededToWageringModalSelector,
  ],
  (...values) => values.some(isNotNil),
);

const bonusWageringProgressSelector = createSimpleSelector(
  [bonusEventsSelectors.wageringProgress],
  (wageringProgress) => {
    if (!wageringProgress) {
      return null;
    }

    const { current, total } = wageringProgress;

    return (Money.toNumber(current) / Money.toNumber(total) * 100).toFixed(2);
  },
);

export {
  bonusEventsSelectors,
  showCommonBonusActivatedModalSelector,
  showGameBonusActivatedModalSelector,
  showCommonBonusCancelModalSelector,
  showGameBonusCancelModalSelector,
  showCommonBonusLostModalSelector,
  showGameBonusLostModalSelector,
  showCommonBonusWonModalSelector,
  showGameBonusWonModalSelector,
  showCommonBonusCompletedModalSelector,
  showGameBonusCompletedModalSelector,
  showGameBonusProceededToWageringModalSelector,
  isBonusEventReceivedSelector,
  bonusWageringProgressSelector,
};
