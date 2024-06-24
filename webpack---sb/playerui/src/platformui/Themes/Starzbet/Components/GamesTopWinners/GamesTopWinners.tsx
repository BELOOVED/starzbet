import isEmpty from "lodash/fp/isEmpty";
import { memo } from "react";
import { useSelector } from "react-redux";
import { EMoneyFormat, isNotNil, Money, useParamSelector } from "@sb/utils";
import { callManagerStartedSelector } from "@sb/call-manager";
import { useTranslation } from "@sb/translator";
import type { TPlatform_TopWinner_Fragment } from "@sb/graphql-client/PlayerUI";
import {
  platformui_starzbet_landing_topWinners,
  platformui_starzbet_topWinnersWillAppearHere,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { EPlatform_ImageSize } from "@sb/graphql-client";
import classes from "./TopWinners.module.css";
import { Loader } from "../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { TOP_WINNERS_LOADING_SYMBOL } from "../../../../Store/TopWinners/Variables";
import { topWinnersNodesSelector } from "../../../../Store/TopWinners/Selectors/TopWinnersSelectors";
import { TranslateRecord } from "../../../../Components/TranslateRecord/TranslateRecord";
import { Ellipsis } from "../../../../Components/Ellipsis/Ellipsis";
import { WithOpenGameContainer } from "../../../../Components/WithOpenGameContainer/WithOpenGameContainer";
import { LazyGameImage } from "../../../../Components/LazyImage/LazyProgressiveImage";
import { SectionTitle } from "../SectionTitle/SectionTitle";
import { ReplayLink } from "../ReplayLink/ReplayLink";

const PARAM = { width: 60 };

const TopWinner = memo<TPlatform_TopWinner_Fragment>(
  ({
    playerLoginMasked,
    payout,
    game,
    replayLink,
  }) => (
    <WithOpenGameContainer id={game.id} className={classes.topWinner}>
      <div className={classes.hover} />

      {
        game
          ? (
            <LazyGameImage
              param={PARAM}
              size={EPlatform_ImageSize.size1}
              previewImages={game.previewImages}
              marginSum={0}
              className={classes.img}
            />
          )
          : null
      }

      <div className={classes.topWinnerContent}>
        {
          game
            ? (
              <Ellipsis>
                <TranslateRecord record={game.name} />
              </Ellipsis>
            )
            : null
        }

        <Ellipsis className={classes.player}>{playerLoginMasked}</Ellipsis>

        <Ellipsis>{Money.toFormat(payout, EMoneyFormat.symbolRight)}</Ellipsis>
      </div>

      {isNotNil(replayLink) ? <ReplayLink replayLink={replayLink} /> : null}
    </WithOpenGameContainer>
  ),
);
TopWinner.displayName = "TopWinner";

const TopWinnersBoard = memo(() => {
  const topWinners = useSelector(topWinnersNodesSelector);
  const [t] = useTranslation();

  return (
    <div className={classes.topWinnersContainer}>
      {
        isEmpty(topWinners)
          ? (
            <div className={classes.empty}>
              {t(platformui_starzbet_topWinnersWillAppearHere)}
            </div>
          )
          : null
      }

      {topWinners.map((topWinner) => <TopWinner {...topWinner} key={topWinner.id} />)}
    </div>
  );
});
TopWinnersBoard.displayName = "TopWinnersBoard";

const TopWinnersContent = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.topWinners}>
      <div className={classes.titleContainer}>
        <SectionTitle markerColor={"var(--purple)"}>
          {t(platformui_starzbet_landing_topWinners)}
        </SectionTitle>
      </div>

      <TopWinnersBoard />
    </div>
  );
});
TopWinnersContent.displayName = "TopWinnersContent";

const GamesTopWinners = memo(() => {
  const loading = useParamSelector(callManagerStartedSelector, [TOP_WINNERS_LOADING_SYMBOL]);

  return loading ? <Loader /> : <TopWinnersContent />;
});
GamesTopWinners.displayName = "GamesTopWinners";

export { GamesTopWinners };
