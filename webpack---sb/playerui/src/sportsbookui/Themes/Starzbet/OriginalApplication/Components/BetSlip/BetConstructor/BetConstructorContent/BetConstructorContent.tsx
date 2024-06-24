import { createElement, memo } from "react";
import { useSelector } from "react-redux";
import { EBetGroup } from "../../../../../../../Store/BetSlip/Model/BetGroup";
import { betGroupSelector } from "../../../../../../../Store/BetSlip/Selectors/BetSlipSelectors";
import { SingleContent } from "./SingleContent/SingleContent";
import { MultiContent } from "./MultiContent/MultiContent";
import { SystemContent } from "./SystemContent/SystemContent";

const contentView = {
  [EBetGroup.single]: SingleContent,
  [EBetGroup.multi]: MultiContent,
  [EBetGroup.system]: SystemContent,
};

const BetConstructorContent = memo(() => {
  const activeGroup = useSelector(betGroupSelector);

  return createElement(contentView[activeGroup]);
});
BetConstructorContent.displayName = "BetConstructorContent";

export { BetConstructorContent };

