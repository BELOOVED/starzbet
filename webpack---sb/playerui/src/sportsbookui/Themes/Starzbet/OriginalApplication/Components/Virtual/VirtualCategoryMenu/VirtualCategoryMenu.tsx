// @ts-nocheck
import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "@sb/react-router-compat";
import classes from "./VirtualCategoryMenu.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { NativeHorizontalScroll } from "../../../../../../../common/Components/NativeHorizontalScroll/NativeHorizontalScroll";
import {
  virtualCategoryIdListByParamsSelector,
} from "../../../../../../Store/Virtual/Common/Selectors/VirtualCategoryIdListByParamsSelector";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { FlagContainer } from "../../../../../../Components/Flag/Flag";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { CategoryName } from "../../../../../../Components/CategoryName/CategoryName";
import { useVirtualNavMenuCategoryHandler } from "../../../../../../Store/Virtual/Common/Hooks/UseVirtualNavMenuCategoryHandler";

const VirtualCategorySlide = memo(({ categoryId }) => {
  const match = useRouteMatch(routeMap.virtual.category);
  const handleClick = useVirtualNavMenuCategoryHandler(categoryId);

  const classList = clsx(
    classes.category,
    match?.params.categoryId === categoryId && classes.categoryActive,
  );

  return (
    <div
      className={classList}
      onClick={handleClick}
    >
      <div className={classes.flag}>
        <FlagContainer categoryId={categoryId} />
      </div>

      <Ellipsis>
        <CategoryName id={categoryId} />
      </Ellipsis>
    </div>
  );
});
VirtualCategorySlide.displayName = "VirtualCategorySlide";

const VirtualCategoryMenu = memo(() => {
  const categoryIdList = useSelector(virtualCategoryIdListByParamsSelector);

  if (categoryIdList.length <= 1) {
    return null;
  }

  return (
    <NativeHorizontalScroll className={clsx(classes.categoryWrapper, IS_MOBILE_CLIENT_SIDE && classes.mobile)}>
      {
        categoryIdList.map((id) => (
          <VirtualCategorySlide key={id} categoryId={id} />
        ))
      }
    </NativeHorizontalScroll>
  );
});
VirtualCategoryMenu.displayName = "VirtualCategoryMenu";

export { VirtualCategoryMenu };
