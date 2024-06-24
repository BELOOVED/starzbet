import Slider, { type Settings } from "react-slick";
import { memo } from "react";
import { useSelector } from "react-redux";
import { EMoneyFormat, isNotNil, Money, useParamSelector, withCondition } from "@sb/utils";
import { callManagerStartedSelector } from "@sb/call-manager";
import { useTranslation } from "@sb/translator";
import type { TPlatform_TopWinner_Fragment } from "@sb/graphql-client/PlayerUI";
import { platformui_starzbet_landing_topWinners } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./TopWinners.module.css";
import { isGameProvider } from "../../../../../common/Store/Provider/ProviderModel";
import { Loader } from "../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { TOP_WINNERS_LOADING_SYMBOL } from "../../../../Store/TopWinners/Variables";
import { isTopWinnersNotEmptyDataSelector, topWinnersNodesSelector } from "../../../../Store/TopWinners/Selectors/TopWinnersSelectors";
import { TranslateRecord } from "../../../../Components/TranslateRecord/TranslateRecord";
import { ProviderIcon } from "../../../../Components/ProviderIcon/ProviderIcon";
import { Ellipsis } from "../../../../Components/Ellipsis/Ellipsis";
import { WithOpenGameContainer } from "../../../../Components/WithOpenGameContainer/WithOpenGameContainer";
import { SectionTitle } from "../SectionTitle/SectionTitle";
import { ReplayLink } from "../ReplayLink/ReplayLink";

const TopWinner = memo<TPlatform_TopWinner_Fragment>(({
  playerLoginMasked,
  payout,
  game,
  provider,
  replayLink,
}) => (
  <WithOpenGameContainer id={game.id} className={classes.topWinner}>
    {isGameProvider(provider) ? <ProviderIcon className={classes.providerIcon} provider={provider} /> : null}

    <div className={classes.topWinnerContent}>
      <Ellipsis>
        <TranslateRecord record={game.name} />
      </Ellipsis>

      <Ellipsis className={classes.player}>{playerLoginMasked}</Ellipsis>

      <Ellipsis>{Money.toFormat(payout, EMoneyFormat.symbolRight)}</Ellipsis>
    </div>

    {isNotNil(replayLink) ? <ReplayLink replayLink={replayLink} /> : null}
  </WithOpenGameContainer>
));
TopWinner.displayName = "TopWinner";

const SETTINGS: Settings = {
  autoplay: true,
  infinite: true,
  swipeToSlide: false,
  speed: 1500,
  slidesToScroll: 1,
  variableWidth: true,
  arrows: false,
  className: classes.slider,
  swipe: false,
};

const TopWinnersBoard = memo(() => {
  const topWinners = useSelector(topWinnersNodesSelector);

  return (
    <Slider {...SETTINGS}>
      {topWinners.map((topWinner) => <TopWinner {...topWinner} key={topWinner.id} />)}
    </Slider>
  );
});
TopWinnersBoard.displayName = "TopWinnersBoard";

const TopWinnersContent = withCondition(
  isTopWinnersNotEmptyDataSelector,
  memo(() => {
    const [t] = useTranslation();

    return (
      <div className={classes.topWinners}>
        <SectionTitle markerColor={"121 73 255"}>
          {t(platformui_starzbet_landing_topWinners)}
        </SectionTitle>

        <TopWinnersBoard />
      </div>
    );
  }),
);
TopWinnersContent.displayName = "TopWinnersContent";

const TopWinners = memo(() => {
  const loading = useParamSelector(callManagerStartedSelector, [TOP_WINNERS_LOADING_SYMBOL]);

  return loading ? <Loader /> : <TopWinnersContent />;
});
TopWinners.displayName = "TopWinners";

export { TopWinners };
