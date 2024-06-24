import { memo } from "react";
import { useSelector } from "react-redux";
import classes from "./CMSHeader.module.css";
import { useCorrectTextByLocale } from "../../../../../Hooks/UseCorrectTextByLocale";
import { CMSSimplePageAnchorSelector } from "../../../../../Store/CMS/Selectors/CMSPageContentSelectors";

const CMSHeader = memo(() => {
  const anchor = useSelector(CMSSimplePageAnchorSelector);

  const text = useCorrectTextByLocale(anchor);

  return (
    <div className={classes.header}>
      {text}
    </div>
  );
});
CMSHeader.displayName = "CMSHeader";

export { CMSHeader };
