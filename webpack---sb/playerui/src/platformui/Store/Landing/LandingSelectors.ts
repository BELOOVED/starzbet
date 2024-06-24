import { createOptionalPropertySelector, createPropertySelector } from "@sb/utils";
import type { TCms_LabelOrGameIds_Union_Fragment, TCms_LabelOrGameWithImageIds_Union_Fragment } from "@sb/graphql-client/CmsUI";
import { isCmsGamesWithImageMap, isCmsLabelMap, isCmsLabelWithImageMap } from "../CMS/Utils/TypeGuards";
import { gameLabelIdsWithGamesByPageWithoutFavsSelector } from "../Games/Selectors/GameLabelIdsWithGamesByPageSelectors";
import { type TWithLandingState } from "./LandingInitialState";

const landingStateSelector = ({ landing }: TWithLandingState) => landing;

const landingLabelsSelector = createPropertySelector(landingStateSelector, "labels");

const landingLabelIdsSelector = createOptionalPropertySelector(landingStateSelector, ["games", "labelIds"]);

const landingFirstLabelSelector = createOptionalPropertySelector(
  gameLabelIdsWithGamesByPageWithoutFavsSelector,
  0,
);

const landingTitleByFragmentSelector = (
  state: TWithLandingState,
  fragment: TCms_LabelOrGameIds_Union_Fragment | TCms_LabelOrGameWithImageIds_Union_Fragment,
) => {
  if (isCmsLabelMap(fragment) || isCmsLabelWithImageMap(fragment)) {
    const labels = landingLabelsSelector(state);

    return labels.find((label) => label.id === fragment.labelId)?.name;
  }

  return fragment.title;
};

const landingImageByFragmentSelector = (
  fragment: TCms_LabelOrGameIds_Union_Fragment | TCms_LabelOrGameWithImageIds_Union_Fragment,
) => {
  if (isCmsLabelWithImageMap(fragment) || isCmsGamesWithImageMap(fragment)) {
    return fragment.image;
  }

  return null;
};

export {
  landingLabelIdsSelector,
  landingTitleByFragmentSelector,
  landingImageByFragmentSelector,
  landingFirstLabelSelector,
};
