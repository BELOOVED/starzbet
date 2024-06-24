import { memo, type ReactNode } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_vipClub_playerState_currentLevel_title,
  platformui_starzbet_vipClub_playerState_lifetimeDepositsProgress_title,
  platformui_starzbet_vipClub_playerState_pointsProgress_points,
  platformui_starzbet_vipClub_playerState_pointsProgress_title,
  type TTKeys,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { withCondition } from "@sb/utils";
import classes from "./VipClubProgress.module.css";
import { FadeIn } from "../../../../../../common/Components/Animations/FadeIn/FadeIn";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import {
  vipClubLifetimeDepositsProgressSelector,
  vipClubPointsProgressPercentSelector,
  vipClubPointsProgressSelector,
  vipClubPointsProgressVisibleSelector,
} from "../../../../../Store/VipClub/Selectors/VipClubProgressSelectors";
import { VipClubProgressLine } from "../../../../../Components/VipClub/VipClubProgress/VipClubProgressLine";
import { VipClubProgressText } from "../../../../../Components/VipClub/VipClubProgress/VipClubProgressText";
import { VipClubProgressPercent } from "../../../../../Components/VipClub/VipClubProgress/VipClubProgressPercent";

interface IVipClubProgressBaseProps {
  currentAmount: number;
  maxAmount: number;
  progressPercent: number;
  background: string;
  titleTKey: TTKeys;
  postfix: ReactNode;
}

const VipClubProgressBase = memo<IVipClubProgressBaseProps>(({
  currentAmount,
  maxAmount,
  background,
  titleTKey,
  progressPercent,
  postfix,
}) => {
  const [t] = useTranslation();

  return (
    <div className={classes.vipClubProgressWrapper}>
      <div className={classes.vipClubProgressHead}>
        <div className={classes.vipClubProgressTitle}>
          <Ellipsis>{t(titleTKey)}</Ellipsis>
        </div>
      </div>

      <div className={classes.vipClubProgress}>
        <VipClubProgressLine progressPercent={progressPercent} backgroundColor={background} className={classes.vipClubProgressLine} />
      </div>

      <div className={classes.vipClubProgressText}>
        <VipClubProgressText
          currentAmount={currentAmount}
          maxAmount={maxAmount}
          postfix={postfix}
        />

        &nbsp;

        {"("}

        <VipClubProgressPercent percent={progressPercent} />

        {")"}
      </div>
    </div>
  );
});
VipClubProgressBase.displayName = "VipClubProgressBase";

const VipClubPointsProgress = withCondition(
  vipClubPointsProgressVisibleSelector,
  memo(() => {
    const props = useSelector(vipClubPointsProgressSelector);
    const [t] = useTranslation();

    return (
      <VipClubProgressBase
        titleTKey={platformui_starzbet_vipClub_playerState_pointsProgress_title}
        background={"var(--orange-gradient)"}
        currentAmount={props.currentAmount}
        maxAmount={props.maxAmount}
        progressPercent={props.progressPercent}
        postfix={t(platformui_starzbet_vipClub_playerState_pointsProgress_points)}
      />
    );
  }),
);
VipClubPointsProgress.displayName = "VipClubPointsProgress";

const VipClubLifetimeDepositsProgress = memo(() => {
  const props = useSelector(vipClubLifetimeDepositsProgressSelector);

  if (!props) {
    return null;
  }

  return (
    <VipClubProgressBase
      titleTKey={platformui_starzbet_vipClub_playerState_lifetimeDepositsProgress_title}
      background={"var(--blue-gradient)"}
      currentAmount={props.currentAmount}
      maxAmount={props.maxAmount}
      progressPercent={props.progressPercent}
      postfix={props.currency}
    />
  );
});
VipClubLifetimeDepositsProgress.displayName = "VipClubLifetimeDepositsProgress";

const VipClubGameWindowHeaderPointsProgress = memo(() => {
  const progressPercent = useSelector(vipClubPointsProgressPercentSelector);
  const [t] = useTranslation();

  if (!progressPercent) {
    return null;
  }

  return (
    <FadeIn className={classes.vipClubProgressHeader}>
      <div>
        <Ellipsis>{t(platformui_starzbet_vipClub_playerState_currentLevel_title)}</Ellipsis>
      </div>

      <div className={classes.vipClubProgress}>
        <VipClubProgressLine
          progressPercent={progressPercent}
          backgroundColor={"var(--orange-gradient)"}
          className={classes.vipClubProgressLine}
        />
      </div>

      <VipClubProgressPercent percent={progressPercent} className={classes.vipClubProgressHeaderPercent} />
    </FadeIn>
  );
});
VipClubGameWindowHeaderPointsProgress.displayName = "VipClubGameWindowHeaderPointsProgress";

export { VipClubPointsProgress, VipClubLifetimeDepositsProgress, VipClubGameWindowHeaderPointsProgress };
