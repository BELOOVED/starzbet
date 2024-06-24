import { ascend, createMemoSelector, createSimpleSelector, isNotEmpty, isNotNil, sortWith } from "@sb/utils";
import { type EGamePage } from "@sb/betting-core/EGamePage";
import { platformConfigSystemLocaleSelector } from "../../../../common/Store/Config/Selectors/ConfigSelectors";
import { getTranslatedText } from "../../../Components/TranslateRecord/TranslateRecord";
import { isFreeSpinsLabelEnabledAndSomeBonusMatchedSelector } from "../../Bonuses/Selectors/FreeSpinsLabelSelectors";
import { localeSelector } from "../../Locale/Selectors/localeSelector";
import { systemLabels } from "../Model/Games";
import { gamePagesSelector, gamesFavouritesSelector } from "./GamesSelectors";

/**
 * no need to use it directly - use 'gameLabelIdsWithGamesByPageSelector'
 */
const gameLabelsByPageSortedSelector = createMemoSelector(
  [
    gamePagesSelector,
    localeSelector,
    platformConfigSystemLocaleSelector,
    (_, page: EGamePage) => page,
  ],
  (pages, userLocale, systemLocale, page) => {
    const currentLabels = pages.find((it) => it.page === page)?.labels || [];

    return sortWith(
      [
        ascend(({ priority }) => Number(priority)),
        ascend(({ label: { name } }) => getTranslatedText(name, userLocale, systemLocale) ?? ""),
      ],
      currentLabels,
    );
  },
);
gameLabelsByPageSortedSelector.displayName = "gameLabelsByPageSortedSelector";

const gameLabelIdsWithGamesByPageSelector = createMemoSelector(
  [
    gameLabelsByPageSortedSelector,
    gamesFavouritesSelector,
    isFreeSpinsLabelEnabledAndSomeBonusMatchedSelector,
  ],
  (labels, favs, withFreeSpins) => {
    const labelsWithGames = labels.filter(
      (it) =>
        (isNotNil(it.activeGamesCount) && it.activeGamesCount > 0) ||
        (it.label.id === systemLabels.favourite && isNotEmpty(favs)) ||
        (it.label.id === systemLabels.activeFreeSpins && withFreeSpins),
    );

    return labelsWithGames.map(({ label: { id } }) => id);
  },
  { combinedEqual: "deepEqual" },
);
gameLabelIdsWithGamesByPageSelector.displayName = "gameLabelIdsWithGamesByPageSelector";

const isNotEmptyGameLabelIdsWithGamesByPageSelector = createSimpleSelector(
  [gameLabelIdsWithGamesByPageSelector],
  isNotEmpty,
);

const gameLabelIdsWithGamesByPageWithoutFavsSelector = createMemoSelector(
  [
    gameLabelsByPageSortedSelector,
    isFreeSpinsLabelEnabledAndSomeBonusMatchedSelector,
  ],
  (labels, withFreeSpins) => {
    const labelsWithGames = labels.filter(
      (it) =>
        (it.label.id !== systemLabels.favourite && isNotNil(it.activeGamesCount) && it.activeGamesCount > 0) ||
        (it.label.id === systemLabels.activeFreeSpins && withFreeSpins),
    );

    return labelsWithGames.map(({ label: { id } }) => id);
  },
  { combinedEqual: "deepEqual" },
);
gameLabelIdsWithGamesByPageWithoutFavsSelector.displayName = "gameLabelIdsWithGamesByPageWithoutFavsSelector";

export {
  gameLabelIdsWithGamesByPageSelector,
  isNotEmptyGameLabelIdsWithGamesByPageSelector,
  gameLabelIdsWithGamesByPageWithoutFavsSelector,
};
