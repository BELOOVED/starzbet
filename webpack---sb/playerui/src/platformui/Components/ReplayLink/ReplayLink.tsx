import { createElement, memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { type TComponent, withStopPropagation } from "@sb/utils";
import { platformui_casino_topWinners_replay } from "@sb/translates/platformui/CommonTKeys";
import { type TIconProps } from "../../../common/Components/Icon/Icon";
import { isMobileSelector } from "../../../common/Store/DeviceInfo/DeviceInfoSelectors";
import { getGameWindowFeatures } from "../../Utils/GameWindowUtils";

interface IReplayLinkProps extends IWithClassName {
  replayLink: string;
  icon: TComponent<TIconProps>;
  withoutTitle?: boolean;
}

const ReplayLink = memo<IReplayLinkProps>(({
  replayLink,
  className,
  icon,
  withoutTitle,
}) => {
  const [t] = useTranslation();
  const isMobile = useSelector(isMobileSelector);

  const onClick = () => {
    window.open(
      replayLink,
      "_blank",
      getGameWindowFeatures(isMobile),
    );
  };

  return (
    <span className={className} onClick={withStopPropagation(onClick)}>
      {createElement(icon)}

      {withoutTitle ? null : <span>{t(platformui_casino_topWinners_replay)}</span>}
    </span>
  );
});
ReplayLink.displayName = "ReplayLink";

export { ReplayLink };
