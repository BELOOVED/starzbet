import { type ComponentType, createElement, memo, type PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { useParams } from "@sb/react-router-compat";
import { withCondition } from "@sb/utils";
import { RedirectLocalized } from "../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import {
  vipClubLeaderBoardPaginationPagesSelector,
  vipClubLeaderBoardPaginationVisibleSelector,
} from "../../Store/VipClub/Selectors/VipClubLeaderBoardSelectors";
import { type IVipClubLeadersParams, type IVipClubPaginationItemProps } from "../../Store/VipClub/VipClubModels";
import { vipClubLeaderBoardIsValidPage } from "../../Store/VipClub/Util/VipClubLeaderBoardUtils";
import { VIP_CLUB_LEADER_BOARD_INITIAL_PAGE_STRING } from "../../Store/VipClub/VipClubVariables";

interface IVipClubPaginationProps extends PropsWithChildren, IWithClassName {
  paginationItemComponentType: ComponentType<IVipClubPaginationItemProps>;
}

const VipClubPaginationBase = withCondition(
  vipClubLeaderBoardPaginationVisibleSelector,
  memo<IVipClubPaginationProps>(({ paginationItemComponentType, className }) => {
    const pages = useSelector(vipClubLeaderBoardPaginationPagesSelector);

    const { page } = useParams<IVipClubLeadersParams>();

    if (!vipClubLeaderBoardIsValidPage(Number(page), pages.length)) {
      return <RedirectLocalized relativePath={VIP_CLUB_LEADER_BOARD_INITIAL_PAGE_STRING} />;
    }

    return (
      <div className={className}>
        {pages.map((value) => createElement(paginationItemComponentType, { value, key: value }))}
      </div>
    );
  }),
);
VipClubPaginationBase.displayName = "VipClubPaginationBase";

export { VipClubPaginationBase };
