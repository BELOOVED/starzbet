import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { useParamSelector } from "@sb/utils";
import { betHashByIdSelector } from "../../Store/MyBets/Selectors/BetHashByIdSelector";
import { editableBetSelector } from "../../Store/MyBets/Selectors/MyBetsSelectors";
import { hashToName } from "../../Store/BetSlip/Model/BetHash";

interface IBetHashNameProps {
  hash: string;
}

const BetHashName = memo<IBetHashNameProps>(({ hash }) => {
  const [t] = useTranslation();

  return t(...hashToName(hash));
});
BetHashName.displayName = "BetHashName";

const BetName = memo<IWithId>(({ id }) => {
  const currentHash = useParamSelector(betHashByIdSelector, [id]);
  const editBet = useSelector(editableBetSelector);

  return (
    <BetHashName hash={(editBet && editBet.id === id) ? editBet.hash : currentHash} />);
});
BetName.displayName = "BetName";

export { BetHashName, BetName };
