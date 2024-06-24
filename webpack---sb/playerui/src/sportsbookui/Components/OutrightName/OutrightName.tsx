import { memo } from "react";
import { type TNullable, type TTranslateItem, type TTranslateRecord, useParamSelector } from "@sb/utils";
import { outrightByIdNotNilSelector } from "../../Store/Feed/Selectors/FeedSelectors";
import { TranslateName } from "../TranslateName/TranslateName";

interface IBetOutrightNameProps {
  name: string;
  translatesForManuallyCreated?: TNullable<TTranslateRecord | TTranslateItem[]>;
}

const OutrightName = memo<IWithId>(({ id }) => {
  const outright = useParamSelector(outrightByIdNotNilSelector, [id]);

  if (outright.translatesForManuallyCreated) {
    return <TranslateName name={outright.translatesForManuallyCreated} />;
  }

  return outright.name;
});
OutrightName.displayName = "OutrightName";

const BetOutrightName = memo<IBetOutrightNameProps>(({ name, translatesForManuallyCreated }) => {
  if (translatesForManuallyCreated) {
    return <TranslateName name={translatesForManuallyCreated} />;
  }

  return name;
});
BetOutrightName.displayName = "BetOutrightName";

export { OutrightName, BetOutrightName };
