import { memo } from "react";
import { withProps } from "@sb/utils";
import classes from "./VipClubPagination.module.css";
import { NavLinkToTop } from "../../../../../../common/Components/LinkToTop/LinkToTop";
import { VipClubPaginationBase } from "../../../../../Components/VipClub/VipClubPaginationBase";

interface IVipClubPaginationItemProps {
  value: number;
}

const VipClubPaginationItem = memo<IVipClubPaginationItemProps>(({ value }) => (
  <NavLinkToTop relativePath={String(value)} className={classes.vipClubPaginationItem}>
    <div className={classes.marginBottom}>{value}</div>
  </NavLinkToTop>
));
VipClubPaginationItem.displayName = "VipClubPaginationItem";

const VipClubPagination = withProps(VipClubPaginationBase)({
  paginationItemComponentType: VipClubPaginationItem,
  className: classes.vipClubPagination,
});

export { VipClubPagination };
