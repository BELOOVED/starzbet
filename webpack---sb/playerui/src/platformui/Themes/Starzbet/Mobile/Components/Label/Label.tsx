import { memo } from "react";
import { type TVoidFn, useParamSelector } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import classes from "./Label.module.css";
import { labelByLabelIdAndPageSelector } from "../../../../../Store/Games/Selectors/GamesSelectors";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { TranslateRecord } from "../../../../../Components/TranslateRecord/TranslateRecord";
import { type IWithGamePage, systemLabelsTKeys } from "../../../../../Store/Games/Model/Games";
import { labelPathByGamePageMap } from "../../../../../Utils/GetGamesViewParams";
import { NavLinkToTop } from "../../../../../Components/NavLink/NavLinkToTop";

interface ILabelProps extends IWithGamePage {
  labelId: string;
  onClick?: TVoidFn;
}

const TranslateLabel = memo<ILabelProps>(({ labelId, page }) => {
  const [t] = useTranslation();
  const { name } = useParamSelector(labelByLabelIdAndPageSelector, [page, labelId]);

  const tKey = systemLabelsTKeys[labelId];
  const secondName = Array.isArray(name) ? <TranslateRecord record={name} /> : name;

  const resultName = tKey ? t(tKey) : secondName;

  return (
    <>
      {resultName}
    </>
  );
});
TranslateLabel.displayName = "TranslateLabel";

const Label = memo<ILabelProps>(({
  labelId,
  page,
}) => {
  const params = { labelId };

  return (
    <NavLinkToTop
      to={labelPathByGamePageMap[page]}
      params={params}
      className={classes.label}
      activeClassName={classes.activeLabel}
    >
      <Ellipsis>
        <TranslateLabel labelId={labelId} page={page} />
      </Ellipsis>
    </NavLinkToTop>
  );
});
Label.displayName = "Label";

export { Label };
