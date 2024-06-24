import { type ComponentType, memo } from "react";
import { useSelector } from "react-redux";
import { type TPlatform_VipClubTournament_Fragment } from "@sb/graphql-client/PlayerUI";
import { type IWithQaAttribute, PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { vipClubTournamentsSelectors } from "../../../Store/VipClub/Selectors/VipClubTournamentsSelectors";

interface IVipClubTournamentsBaseProps extends IWithClassName {
  Tournament: ComponentType<TPlatform_VipClubTournament_Fragment & IWithQaAttribute>;
}

const VipClubActiveTournamentsBase = memo<IVipClubTournamentsBaseProps>(({ Tournament, className }) => {
  const tournaments = useSelector(vipClubTournamentsSelectors.active);

  return (
    <div className={className} {...qaAttr(PlayerUIQaAttributes.VipClubPage.Tournaments_Container)}>
      {tournaments.map((tournament) => <Tournament {...tournament} key={tournament.id} />)}
    </div>
  );
});
VipClubActiveTournamentsBase.displayName = "VipClubActiveTournamentsBase";

export { VipClubActiveTournamentsBase };
