import clsx from "clsx";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_betSlip_systemSelect,
  sportsbookui_starzbet_betSlip_title_countCoupons,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { isNotNil, not, useActionWithBind, useClickOutside, withCondition } from "@sb/utils";
import classes from "./SystemTotal.module.css";
import { When } from "../../../../../../../../../common/Components/When";
import {
  countOfParlayForSystemByHashViewSelector,
} from "../../../../../../../../Store/BetSlip/Selectors/ViewSelectors/CountOfParlayViewSelectors";
import { hashToName } from "../../../../../../../../Store/BetSlip/Model/BetHash";
import { betSlipChangeSystemHashAction } from "../../../../../../../../Store/BetSlip/BetSlipActions";
import { betSlipNotInvalidBankerSelector } from "../../../../../../../../Store/BetSlip/Selectors/BetSlipInvalidBankerSelector";
import {
  currentSystemHashViewSelector,
  systemsViewSelector,
} from "../../../../../../../../Store/BetSlip/Selectors/ViewSelectors/SystemsViewSelectors";
import { ChevronIcon } from "../../../../Icons/ChevronIcon/ChevronIcon";
import { StakeInputForGroupBlock } from "../StakeInput/StakeInput";
import { TotalStakeAndReturn } from "../TotalStakeAndReturn/TotalStakeAndReturn";

type TSystemOptionProps = {
  hash: string;
}
const SystemOption = memo<TSystemOptionProps>(({ hash }) => {
  const [t] = useTranslation();
  const parlayCount = useSelector(countOfParlayForSystemByHashViewSelector(hash));
  const changeSystemHash = useActionWithBind(betSlipChangeSystemHashAction, hash);
  const currentHash = useSelector(currentSystemHashViewSelector);

  return (
    <button
      key={hash}
      className={clsx(classes.option, currentHash === hash && classes.active)}
      onClick={changeSystemHash}
    >
      {t(...hashToName(hash))}

      &nbsp;

      {"("}

      {t(sportsbookui_starzbet_betSlip_title_countCoupons, { count: parlayCount })}

      {")"}
    </button>
  );
});
SystemOption.displayName = "SystemOption";

const SystemOptions = memo(() => {
  const systems = useSelector(systemsViewSelector);

  return (
    <div className={classes.options}>
      {systems.map((hash) => <SystemOption key={hash} hash={hash} />)}
    </div>
  );
});
SystemOptions.displayName = "SystemOptions";

const SystemSelect = withCondition(
  betSlipNotInvalidBankerSelector,
  memo(() => {
    const [t] = useTranslation();
    const [hidden, setHidden] = useState(true);
    const currentHash = useSelector(currentSystemHashViewSelector);
    const hiddenHandler = () => setHidden(true);
    const toggleHandler = () => setHidden(not);

    const ref = useClickOutside<HTMLDivElement>(hiddenHandler);
    const placeholder = t(sportsbookui_starzbet_betSlip_systemSelect);

    return (
      <div className={classes.systemSelect}>
        <div className={classes.input} ref={ref} onClick={toggleHandler}>
          {isNotNil(currentHash) ? t(...hashToName(currentHash)) : placeholder}

          <ChevronIcon className={classes.chevronIcon} expanded={!hidden} size={"m"} />

          <When condition={!hidden}>
            <SystemOptions />
          </When>
        </div>
      </div>
    );
  }),
);
SystemSelect.displayName = "SystemSelect";

const SystemTotal = memo(() => (
  <>
    <SystemSelect />

    <StakeInputForGroupBlock />

    <TotalStakeAndReturn />
  </>
));
SystemTotal.displayName = "SystemTotal";

export { SystemTotal };
