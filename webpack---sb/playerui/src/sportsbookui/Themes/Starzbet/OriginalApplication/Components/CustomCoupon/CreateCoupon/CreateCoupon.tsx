// @ts-nocheck

import Scrollbar from "react-scrollbars-custom";
import clsx from "clsx";
import { createElement, memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "@sb/react-router-compat";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_button_back,
  sportsbookui_starzbet_button_continue,
  sportsbookui_starzbet_button_save,
  sportsbookui_starzbet_coupon_create_addMoreEvents_button,
  sportsbookui_starzbet_coupon_create_chooseCategory_text,
  sportsbookui_starzbet_coupon_create_chooseCategory_title,
  sportsbookui_starzbet_coupon_create_chooseSport_text,
  sportsbookui_starzbet_coupon_create_chooseSport_title,
  sportsbookui_starzbet_coupon_create_chooseTournament_text,
  sportsbookui_starzbet_coupon_create_chooseTournament_title,
  sportsbookui_starzbet_coupon_create_tournamentSelected_title,
  sportsbookui_starzbet_coupon_tooltip_addMoreEventsOptional,
  sportsbookui_starzbet_coupon_tooltip_finaliseAndSaveYourCoupon,
  sportsbookui_starzbet_coupon_tooltip_nameYourCouponAndSave,
  sportsbookui_starzbet_saveCouponForm_placeholder_nameYourCouponToAddIt,
  sportsbookui_starzbet_search_countResultFound,
  sportsbookui_starzbet_search_resultsFound,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { isNotVoid, keyToComponent, useAction, useParamSelector, withProps } from "@sb/utils";
import classes from "./CreateCoupon.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { When } from "../../../../../../../common/Components/When";
import { CloseIcon } from "../../../../../../../common/Themes/Starzbet/Components/Icons/CloseIcon/CloseIcon";
import { ArrowLeftIcon } from "../../../../../../../common/Themes/Starzbet/Components/Icons/ArrowIcon/ArrowLeftIcon";
import { preLiveSizeSelector } from "../../../../../../Store/SportMenu/Selectors/EventIdListByCategoryIdSelector";
import { outrightCountBySportIdSelector } from "../../../../../../Store/SportMenu/Selectors/OutrightCountBySportIdSelector";
import { categoryIdListByTranslateSelector } from "../../../../../../Store/Feed/Selectors/CategoryIdListByTranslateSelector";
import {
  useEsportPreLiveSportIdListByTranslateSelector,
  useNotEsportPreLiveSportIdListByTranslateSelector,
} from "../../../../../../Store/Feed/Hooks/UseSportIdListSelector";
import { getSportTKeyById } from "../../../../../../Store/Feed/Model/Sport";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { CategoryName } from "../../../../../../Components/CategoryName/CategoryName";
import { FlagContainer } from "../../../../../../Components/Flag/Flag";
import { useTournamentIdListByTranslateSelector } from "../../../../../../Store/Feed/Hooks/UseTournamentIdListByTranslateSelector";
import { TournamentName } from "../../../../../../Components/TournamentName/TournamentName";
import { useCouponToggleTournament } from "../../../../../../Store/Coupon/Hooks/UseCouponToggleTournament";
import {
  couponNewCouponFilterTournamentIdListSelector,
  couponNewCouponHasTournamentIdSelector,
  couponPlayerSelector,
} from "../../../../../../Store/Coupon/Selectors/CouponsSelector";
import {
  couponRemoveTournamentAction,
  couponSaveAction,
  couponStartCreateAction,
  couponUpdateAction,
} from "../../../../../../Store/Coupon/CouponActions";
import { useCouponNameHandle } from "../../../../../../Store/Coupon/Hooks/UseCouponNameHandle";
import { Input } from "../../../../../../Components/Input/Input";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import { sizePreLiveEventBySportIdSelector } from "../../../../../../Store/Feed/Selectors/PreLiveEventsSelector";
import { ModalButton } from "../../../Desktop/Components/ModalButton/ModalButton";
import { SportIcon } from "../../SportIcon/SportIcon";
import { FootballIcon } from "../../Icons/FootballIcon/FootballIcon";
import { GlobeIcon } from "../../Icons/GlobeIcon/GlobeIcon";
import { PlusIcon } from "../../Icons/PlusIcon/PlusIcon";
import { EditNoteIcon } from "../../Icons/EditNoteIcon/EditNoteIcon";
import { CheckIcon } from "../../Icons/CheckIcon/CheckIcon";
import { CouponSearch } from "../CouponSearch/CouponSearch";

const steps = {
  sport: "sport",
  category: "category",
  tournament: "tournament",
  finalise: "finalise",
};

const activeStepClass = (number, step) => clsx(number <= step && classes.activeStep);

const Title = memo(({ title }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.title}>
      {t(title)}
    </div>
  );
});
Title.displayName = "Title";

const Text = memo(({ text, width }) => {
  const [t] = useTranslation();

  const style = { width };

  return (
    <div className={classes.text} style={style}>
      {t(text)}
    </div>
  );
});
Text.displayName = "Text";

interface IStepProps {
  fullPoint?: boolean;
  active: boolean;
}

const Step = memo<IStepProps>(({ current, index }) => {
  if (current > index) {
    return (
      <div className={clsx(classes.point, classes.activeStep)}>
        <CheckIcon />
      </div>
    );
  }

  return (
    <div className={clsx(classes.point, current === index && classes.activeStep)} />
  );
});
Step.displayName = "Step";

const Indicator = memo(({ step }) => (
  <div className={classes.indicator}>
    <Step index={0} current={step} />

    <div className={clsx(classes.line, activeStepClass(1, step))} />

    <Step index={1} current={step} />

    <div className={clsx(classes.line, activeStepClass(2, step))} />

    <Step index={2} current={step} />

    <div className={clsx(classes.line, activeStepClass(3, step))} />

    <Step index={3} current={step} />
  </div>
));
Indicator.displayName = "Indicator";

const Columns = ({ children, className }) => (
  <div className={clsx(classes.scroll, className)}>
    <Scrollbar noScrollX>
      <div className={classes.columns}>
        {children}
      </div>
    </Scrollbar>
  </div>
);
Columns.displayName = "Columns";

const Item = memo(({
  id,
  icon,
  text,
  onClick,
  flag,
}) => {
  const count = useParamSelector(sizePreLiveEventBySportIdSelector, [id]);
  const outrightCount = useParamSelector(outrightCountBySportIdSelector, [id]);
  const size = useParamSelector(preLiveSizeSelector, [id]);
  const fullCount = count + outrightCount;

  return (
    <div className={clsx(classes.item, classes.short)} onClick={onClick} data-id={id}>
      {createElement(icon)}

      <div className={classes.itemTitle}>
        <Ellipsis>
          {text}
        </Ellipsis>
      </div>

      <div className={classes.sportsCount}>
        {flag === "sport" ? fullCount : size}
      </div>
    </div>
  );
});
Item.displayName = "Item";

const CountResult = memo(({ count, showed }) => {
  const [t] = useTranslation();

  if (!showed) {
    return null;
  }

  return (
    <div className={classes.countResult}>
      {
        count !== 1
          ? `${count} ${t(sportsbookui_starzbet_search_resultsFound)}`
          : t(sportsbookui_starzbet_search_countResultFound, { count })
      }
    </div>
  );
});
CountResult.displayName = "CountResult";

const Back = memo(({ prev, setStep }) => {
  const [t] = useTranslation();

  const clickHandler = useCallback(() => setStep(prev), []);

  return (
    <div className={classes.back} onClick={clickHandler}>
      <ArrowLeftIcon size={"m"} />

      <Ellipsis>
        {t(sportsbookui_starzbet_button_back)}
      </Ellipsis>
    </div>
  );
});
Back.displayName = "Back";

const ChooseSport = memo(({ setStep, setCurrentId, sportIdHook = useNotEsportPreLiveSportIdListByTranslateSelector }) => {
  const [t] = useTranslation();

  const [value, setValue] = useState(null);

  const ids = sportIdHook(value);

  const selectHandler = useCallback(
    (e: any) => {
      setStep(steps.category);
      setCurrentId(e.currentTarget.dataset.id);
    },
    [],
  );

  return (
    // eslint-disable-next-line rulesdir/jsx-element-max-length
    <div className={classes.container}>
      <div className={classes.header}>
        <FootballIcon />

        <Title title={sportsbookui_starzbet_coupon_create_chooseSport_title} />

        <Text
          width={IS_MOBILE_CLIENT_SIDE ? "100%" : 878}
          text={sportsbookui_starzbet_coupon_create_chooseSport_text}
        />

        <Indicator step={0} />
      </div>

      <CouponSearch
        onSubmit={setValue}
      />

      <CountResult
        count={ids.length}
        showed={!!value}
      />

      <Columns>
        {
          ids.map((id) => (
            <Item
              key={id}
              id={id}
              text={t(getSportTKeyById(id))}
              onClick={selectHandler}
              icon={withProps(SportIcon)({ color: "darkText", id })}
              flag={"sport"}
            />
          ))
        }
      </Columns>
    </div>
  );
});
ChooseSport.displayName = "ChooseSport";

const CategoryIcon = memo<IWithId>(({ id }) => (
  <div className={classes.categoryIcon}>
    <FlagContainer categoryId={id} />
  </div>
));
CategoryIcon.displayName = "CategoryIcon";

const ChooseCategory = memo(({ currentId, setStep, setCurrentId }) => {
  const [value, setValue] = useState(null);

  const ids = useParamSelector(categoryIdListByTranslateSelector, [currentId, value]);

  const selectHandler = useCallback(
    (e: any) => {
      setStep(steps.tournament);
      setCurrentId(e.currentTarget.dataset.id);
    },
    [],
  );

  return (
    // eslint-disable-next-line rulesdir/jsx-element-max-length
    <div className={classes.container}>
      <div className={classes.header}>
        <Back prev={steps.sport} setStep={setStep} />

        <GlobeIcon />

        <Title title={sportsbookui_starzbet_coupon_create_chooseCategory_title} />

        <Text
          width={IS_MOBILE_CLIENT_SIDE ? "100%" : 878}
          text={sportsbookui_starzbet_coupon_create_chooseCategory_text}
        />

        <Indicator step={1} />
      </div>

      <CouponSearch
        onSubmit={setValue}
      />

      <CountResult
        count={ids.length}
        showed={isNotVoid(value)}
      />

      <Columns>
        {
          ids.map((id) => (
            <Item
              key={id}
              id={id}
              text={<CategoryName id={id} />}
              onClick={selectHandler}
              icon={withProps(CategoryIcon)({ id })}
            />
          ))
        }
      </Columns>
    </div>
  );
});
ChooseCategory.displayName = "ChooseCategory";

const Tournament = memo(({ id, sportId }) => {
  const active = useParamSelector(couponNewCouponHasTournamentIdSelector, [id]);

  const toggleActive = useCouponToggleTournament(id, active);

  return (
    <div className={clsx(classes.item, classes.large, active && classes.active)} onClick={toggleActive}>
      <SportIcon id={sportId} />

      <div className={classes.itemTitle}>
        <Ellipsis>
          <TournamentName id={id} />
        </Ellipsis>
      </div>

      <div className={clsx(classes.plus, active && classes.close)}>
        <PlusIcon size={"m"} color={"text"} />
      </div>
    </div>
  );
});
Tournament.displayName = "Tournament";

const SelectedTournament = memo(({ id }) => {
  const dispatch = useDispatch();

  const removeId = useCallback(
    () => dispatch(couponRemoveTournamentAction(id)),
    [id],
  );

  return (
    <div className={classes.selectedTournament}>
      <div className={classes.name}>
        <Ellipsis>
          <TournamentName id={id} />
        </Ellipsis>
      </div>

      <CloseIcon
        width={12}
        height={12}
        onClick={removeId}
      />
    </div>
  );
});
SelectedTournament.displayName = "SelectedTournament";

const ChooseTournament = memo(({ currentId, setStep, sportId }) => {
  const [t] = useTranslation();

  const [value, setValue] = useState(null);

  const ids = useTournamentIdListByTranslateSelector(currentId, value);

  const selectedIds = useSelector(couponNewCouponFilterTournamentIdListSelector);

  const saveHandler = useCallback(() => setStep(steps.finalise), []);

  return (
    // eslint-disable-next-line rulesdir/jsx-element-max-length
    <div className={classes.container}>
      <div className={classes.header}>
        <Back prev={steps.category} setStep={setStep} />

        <GlobeIcon />

        <Title title={sportsbookui_starzbet_coupon_create_chooseTournament_title} />

        <Text
          width={IS_MOBILE_CLIENT_SIDE ? "100%" : 878}
          text={sportsbookui_starzbet_coupon_create_chooseTournament_text}
        />

        <Indicator step={2} />
      </div>

      <CouponSearch
        onSubmit={setValue}
      />

      <CountResult
        count={ids.length}
        showed={!!value}
      />

      <Columns className={classes.scrollFooter}>
        {ids.map(keyToComponent("id", { sportId })(Tournament))}
      </Columns>

      <div className={classes.bottom}>
        <When condition={selectedIds.length > 0}>
          <div className={classes.tournamentsWrapper}>
            <div className={classes.tournamentSelected}>
              <div className={classes.tournamentCount}>{selectedIds.length}</div>

              <div className={classes.tournamentSelectedTitle}>{t(sportsbookui_starzbet_coupon_create_tournamentSelected_title)}</div>
            </div>

            <div className={clsx(classes.scroll, classes.tournamentListScroll)}>
              <Scrollbar noScrollX>
                <div className={classes.tournamentList}>
                  {selectedIds.map(keyToComponent("id")(SelectedTournament))}
                </div>
              </Scrollbar>
            </div>
          </div>

          <ModalButton onClick={saveHandler} className={classes.tournamentButton}>
            {t(sportsbookui_starzbet_button_continue)}
          </ModalButton>
        </When>
      </div>
    </div>
  );
});
ChooseTournament.displayName = "ChooseTournament";

const Finalise = memo(({ setStep }) => {
  const [t] = useTranslation();

  const selectedIds = useSelector(couponNewCouponFilterTournamentIdListSelector);

  const { saving, newCoupon } = useSelector(couponPlayerSelector);

  const save = useAction(couponSaveAction);

  const backToStart = useCallback(() => setStep(steps.sport), []);

  useEffect(
    () => {
      if (selectedIds.length === 0) {
        backToStart();
      }
    },
    [selectedIds],
  );

  const [name, inputHandle, submitHandle] = useCouponNameHandle(saving, newCoupon, save);

  const saveHandler = useCallback(
    (e: any) => {
      if (!name) {
        return;
      }

      backToStart();
      submitHandle(e);
    },
    [submitHandle],
  );

  return (
    // eslint-disable-next-line rulesdir/jsx-element-max-length
    <div className={classes.container}>
      <div className={clsx(classes.header, classes.large)}>
        <Back prev={steps.tournament} setStep={setStep} />

        <EditNoteIcon />

        <Title title={sportsbookui_starzbet_coupon_tooltip_finaliseAndSaveYourCoupon} />

        <div className={classes.text}>
          <div>
            {"1. "}

            {t(sportsbookui_starzbet_coupon_tooltip_addMoreEventsOptional)}
          </div>

          <div>
            {"2. "}

            {t(sportsbookui_starzbet_coupon_tooltip_nameYourCouponAndSave)}
          </div>
        </div>

        <Indicator step={3} />
      </div>

      <div className={classes.saveForm}>
        <div className={clsx(classes.saveScroll, classes.tournamentListScroll)}>
          <Scrollbar noScrollX>
            <div className={classes.tournamentList}>
              {selectedIds.map(keyToComponent("id")(SelectedTournament))}
            </div>
          </Scrollbar>
        </div>

        <div className={classes.saveInput}>
          <Input
            type={"text"}
            value={name}
            onChange={inputHandle}
            placeholder={t(sportsbookui_starzbet_saveCouponForm_placeholder_nameYourCouponToAddIt)}
            placeholderClass={classes.placeholder}
          />
        </div>

        <ModalButton
          onClick={saveHandler}
          fit
          className={clsx(classes.saveButton, !name && classes.disable)}
          disabled={!name}
        >
          {t(sportsbookui_starzbet_button_save)}
        </ModalButton>
      </div>

      <div className={classes.bottomLine} />

      <div className={clsx(classes.bottom, classes.finalBottom)}>
        <div className={classes.addMore} onClick={backToStart}>
          <Ellipsis>
            {t(sportsbookui_starzbet_coupon_create_addMoreEvents_button)}
          </Ellipsis>
        </div>
      </div>
    </div>
  );
});
Finalise.displayName = "Finalise";

const components = {
  [steps.sport]: ChooseSport,
  [steps.category]: ChooseCategory,
  [steps.tournament]: ChooseTournament,
  [steps.finalise]: Finalise,
};

const esportComponents = {
  ...components,
  [steps.sport]: withProps(ChooseSport)({ sportIdHook: useEsportPreLiveSportIdListByTranslateSelector }),
};

const CreateCoupon = memo(({ couponId }) => {
  const [step, setStep] = useState(steps.sport);
  const [sportId, setSportId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  const startCreateCoupon = useAction(couponStartCreateAction);

  const updateCoupon = useAction(couponUpdateAction);

  useEffect(
    () => {
      if (couponId) {
        updateCoupon(couponId);
        setStep(steps.finalise);
      } else {
        startCreateCoupon();
      }
    },
    [],
  );

  const state = {
    [steps.sport]: {
      setCurrentId: setSportId,
    },
    [steps.category]: {
      currentId: sportId,
      setCurrentId: setCategoryId,
    },
    [steps.tournament]: {
      currentId: categoryId,
      sportId,
    },
  };

  const esport = useRouteMatch(routeMap.esport.root);

  const view = esport
    ? esportComponents[step]
    : components[step];

  return (
    createElement(view, { setStep, ...state[step] })
  );
});
CreateCoupon.displayName = "CreateCoupon";

export { CreateCoupon };
