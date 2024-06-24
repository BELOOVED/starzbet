import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import { sportsbookui_starzbet_betSlip_myBets_button_loadMore } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { isEmpty, useAction, withCondition } from "@sb/utils";
import classes from "./MyBets.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { Button } from "../../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { betTypeFilter } from "../../../../../../Store/MyBets/Model/BetTypeFilter";
import {
  betsMyBetsSelector,
  hasNextPageMyBetsSelector,
  pendingMyBetsSelector,
} from "../../../../../../Store/MyBets/Selectors/MyBetsSelectors";
import { loadMoreMyBetsAction } from "../../../../../../Store/MyBets/MyBetsActions";
import { useMyBets } from "../../../../../../Store/MyBets/Hooks/UseMyBets";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { Loader } from "../../Loader/Loader";
import { BetFromFS } from "../Bet/BetFromFS/BetFromFS";
import { BetTypeTabs } from "../BetSlipTabs/BetSlipSecondLineTabs/BetTypeTabs";
import { MyBetsNoBets } from "../BetSlipEmpty/BetSlipEmpty";

const LoadMore = withCondition(
  hasNextPageMyBetsSelector,
  memo(() => {
    const [t] = useTranslation();

    const loadMore = useAction(loadMoreMyBetsAction);

    return (
      <div className={classes.loadMore}>
        <Button
          colorScheme={"orange-gradient"}
          className={classes.loadMoreButton}
          onClick={loadMore}
          wide
        >
          <Ellipsis>
            {t(sportsbookui_starzbet_betSlip_myBets_button_loadMore)}
          </Ellipsis>
        </Button>
      </div>
    );
  }),
);
LoadMore.displayName = "LoadMore";

const MyBets = memo(() => {
  useMyBets([betTypeFilter.OPENED], 10);
  const pending = useSelector(pendingMyBetsSelector);
  const bets = useSelector(betsMyBetsSelector);

  return (
    <>
      <BetTypeTabs />

      <div className={clsx(classes.bets, IS_MOBILE_CLIENT_SIDE && classes.mobile)}>
        {
          pending
            ? <Loader className={classes.myBetsLoader} />

            : bets.map((bet) => (
              //@ts-ignore
              <BetFromFS
                {...bet}
                key={bet.id}
                isDropDown={true}
              />
            ))
        }

        {!pending && isEmpty(bets) ? <MyBetsNoBets /> : null}
      </div>

      <LoadMore />
    </>
  );
});
MyBets.displayName = "MyBets";

export { MyBets };
