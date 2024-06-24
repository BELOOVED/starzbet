// @ts-nocheck

import Scrollbar from "react-scrollbars-custom";
import clsx from "clsx";
import { memo, useCallback, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EMoneyFormat, isEmpty, Money, not } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_betHistory_amount_cashedOut,
  sportsbookui_starzbet_betHistory_title_editedBet,
  sportsbookui_starzbet_betHistory_title_originalBet,
  sportsbookui_starzbet_betSlip_title_betHistory,
  sportsbookui_starzbet_betSlip_title_potentialReturn,
  sportsbookui_starzbet_newEditPick_edited,
  sportsbookui_starzbet_title_stake,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./BetHistory.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { modalSelector } from "../../../../../../../../common/Store/Modal/Selectors/ModalSelectors";
import { ThemedModal } from "../../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModal";
import {
  ThemedModalHeader,
} from "../../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModalHeader/ThemedModalHeader";
import {
  ThemedModalText,
} from "../../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModalText/ThemedModalText";
import { EModal } from "../../../../../../../../common/Store/Modal/Model/EModal";
import { modalCloseAction } from "../../../../../../../../common/Store/Modal/ModalActions";
import { DateFormat } from "../../../../../../../../common/Components/Date/DateFormat";
import { BetHashName } from "../../../../../../../Components/BetName/BetName";
import { betHistoryByBetIdSelector, cashoutHistoryByBetIdSelector } from "../../../../../../../Store/MyBets/Selectors/MyBetsSelectors";
import { sortBy } from "../../../../../../../Utils/SortBy";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { Loader } from "../../../../Components/Loader/Loader";
import { ChevronIcon } from "../../../../Components/Icons/ChevronIcon/ChevronIcon";
import { PickFromFS } from "../../../../Components/BetSlip/Pick/Pick";

const HistoryItem = memo(({
  hash,
  createdAt,
  original,
  totalStake,
  picks,
  totalPotentialPayout,
}) => {
  const [t] = useTranslation();
  const [collapsed, toggleCollapsed] = useReducer(not<boolean>, false);

  return (
    // eslint-disable-next-line rulesdir/jsx-element-max-length
    <div className={classes.item} onClick={toggleCollapsed}>
      <div className={classes.itemTop}>
        <div className={classes.name}>
          <Ellipsis className={classes.nameText}>
            {
              original
                ? t(sportsbookui_starzbet_betHistory_title_originalBet)
                : t(sportsbookui_starzbet_betHistory_title_editedBet)
            }

            {" - "}

            <BetHashName hash={hash} />
          </Ellipsis>

          {
            original
              ? null
              : (
                <div className={classes.labelEdited}>
                  {t(sportsbookui_starzbet_newEditPick_edited)}
                </div>
              )
          }
        </div>

        <div className={classes.dateAndChevron}>
          <Ellipsis className={classes.date}>
            <DateFormat date={createdAt} format={"dd.MM.yyyy hh:mm:ss"} />
          </Ellipsis>

          <ChevronIcon expanded={collapsed} size={"m"} color={"text"} />
        </div>
      </div>

      {
        collapsed && (
          <div className={classes.detail}>
            {picks.map((pick) => <PickFromFS {...pick} key={pick.id} />)}

            <div className={classes.result}>
              <div className={classes.resultItem}>
                <Ellipsis>
                  {t(sportsbookui_starzbet_title_stake)}

                  {":"}
                </Ellipsis>

                <Ellipsis>
                  {Money.toFormat(totalStake, EMoneyFormat.codeRight)}
                </Ellipsis>
              </div>

              <div className={classes.resultItem}>
                <Ellipsis>
                  {t(sportsbookui_starzbet_betSlip_title_potentialReturn)}

                  {":"}
                </Ellipsis>

                <Ellipsis>
                  {Money.toFormat(totalPotentialPayout, EMoneyFormat.codeRight)}
                </Ellipsis>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
});
HistoryItem.displayName = "HistoryItem";

const CashOutItem = memo(({ createdAt, sum }) => {
  const [t] = useTranslation();

  return (
    <div className={`${classes.item} ${classes.noPointer}`}>
      <div className={classes.itemTop}>
        <Ellipsis className={classes.name}>
          {`${Money.toFormat(sum, EMoneyFormat.codeRight)} `}

          {t(sportsbookui_starzbet_betHistory_amount_cashedOut)}
        </Ellipsis>

        <Ellipsis className={classes.date}>
          <DateFormat date={createdAt} format={"dd.MM.yyyy hh:mm:ss"} />
        </Ellipsis>
      </div>
    </div>
  );
});
CashOutItem.displayName = "CashOutItem";

const Item = memo((props) => (props.hasOwnProperty("hash")
  ? <HistoryItem {...props} />
  : <CashOutItem {...props} />));
Item.displayName = "Item";

// todo use PickFromFS
const BetHistory = memo(() => {
  const [t] = useTranslation();

  const modal = useSelector(modalSelector);

  const history = useSelector(betHistoryByBetIdSelector(modal.betHistory.betId));

  const cashOutHistory = useSelector(cashoutHistoryByBetIdSelector(modal.betHistory.betId));

  const dispatch = useDispatch();

  const closeHandler = useCallback(
    () => {
      dispatch(modalCloseAction(EModal.betHistory));
    },
    [dispatch],
  );

  const list = sortBy((({ createdAt }) => createdAt), [...history, ...cashOutHistory]);

  return (
    <ThemedModal onCancel={closeHandler} className={clsx(classes.modal, IS_MOBILE_CLIENT_SIDE && classes.mobile)}>
      <ThemedModalHeader closeButtonClickHandler={closeHandler}>
        <ThemedModalText size={"lg"} color={"dark"} capitalize>
          {t(sportsbookui_starzbet_betSlip_title_betHistory)}
        </ThemedModalText>
      </ThemedModalHeader>

      {
        isEmpty(list)
          ? <Loader />
          : (
            <Scrollbar noScrollX translateContentSizesToHolder>
              {list.map((props, index) => <Item {...props} key={index} />)}
            </Scrollbar>
          )
      }
    </ThemedModal>
  );
});
BetHistory.displayName = "BetHistory";

export { BetHistory };
