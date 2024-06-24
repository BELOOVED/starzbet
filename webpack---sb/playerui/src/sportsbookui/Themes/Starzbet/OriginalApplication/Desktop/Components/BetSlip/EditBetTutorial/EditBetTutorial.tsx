// @ts-nocheck
import clsx from "clsx";
import { createElement, type Dispatch, Fragment, memo, type MouseEventHandler, type SetStateAction, useCallback, useState } from "react";
import {
  sportsbookui_starzbet_editBet_tutorial_add,
  sportsbookui_starzbet_editBet_tutorial_button_next,
  sportsbookui_starzbet_editBet_tutorial_button_startEdit,
  sportsbookui_starzbet_editBet_tutorial_editBet,
  sportsbookui_starzbet_editBet_tutorial_remove,
  sportsbookui_starzbet_editBet_tutorial_swap,
  sportsbookui_starzbet_editBet_tutorial_text_andItWillBeRemovedFromYourBetslip,
  sportsbookui_starzbet_editBet_tutorial_text_andSelectAnyOddsFormTheEventList,
  sportsbookui_starzbet_editBet_tutorial_text_andSwapTheTeamMarket,
  sportsbookui_starzbet_editBet_tutorial_text_or,
  sportsbookui_starzbet_editBet_tutorial_text_remove,
  sportsbookui_starzbet_editBet_tutorial_text_swapAdd,
  sportsbookui_starzbet_editBet_tutorial_text_toAddANewSelectionClickOnThisIcon,
  sportsbookui_starzbet_editBet_tutorial_text_toRemoveASelectionClickOnThisIcon,
  sportsbookui_starzbet_editBet_tutorial_text_toSwapYourSelectionClickOnThisIcon,
  sportsbookui_starzbet_editBet_tutorial_text_withTheNewEditBetFeatureYouCanNow,
  sportsbookui_starzbet_editBet_tutorial_text_yourSelections,
  sportsbookui_starzbet_modal_checkbox_dontShowThisMessageAgain,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { withProps } from "@sb/utils";
import { platformui_starzbet_button_back } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./EditBetTutorial.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { ThemedModal } from "../../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModal";
import {
  ThemedModalHeader,
} from "../../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModalHeader/ThemedModalHeader";
import { ThemedModalBody } from "../../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModalBody/ThemedModalBody";
import { Button } from "../../../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { decrement } from "../../../../../../../../platformui/Utils/Decrement";
import { ThemedModalText } from "../../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModalText/ThemedModalText";
import {
  ThemedModalTextBlock,
} from "../../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModalTextBlock/ThemedModalTextBlock";
import { EModal } from "../../../../../../../../common/Store/Modal/Model/EModal";
import { useSkipModal } from "../../../../../../../../common/Store/Modal/Hooks/UseSkipModal";
import { TrashIcon } from "../../../../../../../../common/Themes/Starzbet/Components/Icons/TrashIcon/TrashIcon";
import { range } from "../../../../../../../Utils/Range";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { CheckboxIcon } from "../../../../Components/Icons/CheckboxIcon/CheckboxIcon";
import { RegisterIcon } from "../../../../Components/Icons/RegisterIcon/RegisterIcon";
import { RefreshIcon } from "../../../../Components/Icons/RefreshIcon/RefreshIcon";
import { PlusCircleIcon } from "../../../../Components/Icons/PlusIcon/PlusCircleIcon";
import { ChevronLeftIcon } from "../../../../Components/Icons/ChevronIcon/ChevronLeftIcon";
import { CheckIcon } from "../../../../Components/Icons/CheckIcon/CheckIcon";

const increment = (value) => value + 1;

const StepContent1 = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      {t(sportsbookui_starzbet_editBet_tutorial_text_withTheNewEditBetFeatureYouCanNow)}
      &nbsp;

      {t(sportsbookui_starzbet_editBet_tutorial_text_swapAdd)}
      &nbsp;

      {t(sportsbookui_starzbet_editBet_tutorial_text_or)}
      &nbsp;

      {t(sportsbookui_starzbet_editBet_tutorial_text_remove)}
      &nbsp;

      {t(sportsbookui_starzbet_editBet_tutorial_text_yourSelections)}
    </>
  );
});
StepContent1.displayName = "StepContent1";

const StepContent2 = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      {t(sportsbookui_starzbet_editBet_tutorial_text_toSwapYourSelectionClickOnThisIcon)}

      {t(sportsbookui_starzbet_editBet_tutorial_text_andSwapTheTeamMarket)}
    </>
  );
});
StepContent2.displayName = "StepContent2";

const StepContent3 = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      {t(sportsbookui_starzbet_editBet_tutorial_text_toAddANewSelectionClickOnThisIcon)}

      {t(sportsbookui_starzbet_editBet_tutorial_text_andSelectAnyOddsFormTheEventList)}
    </>
  );
});
StepContent3.displayName = "StepContent3";

const StepContent4 = memo(() => {
  const [t] = useTranslation();

  return (
    <>
      {t(sportsbookui_starzbet_editBet_tutorial_text_toRemoveASelectionClickOnThisIcon)}

      {t(sportsbookui_starzbet_editBet_tutorial_text_andItWillBeRemovedFromYourBetslip)}
    </>
  );
});
StepContent4.displayName = "StepContent4";

const steps = {
  0: {
    icon: withProps(RegisterIcon)({ className: clsx(classes.icon, classes.editIcon) }),
    title: sportsbookui_starzbet_editBet_tutorial_editBet,
    content: (
      <StepContent1 />
    ),
  },
  1: {
    icon: withProps(RefreshIcon)({ className: classes.icon }),
    title: sportsbookui_starzbet_editBet_tutorial_swap,
    content: (
      <StepContent2 />
    ),
  },
  2: {
    icon: withProps(PlusCircleIcon)({ className: classes.icon }),
    title: sportsbookui_starzbet_editBet_tutorial_add,
    content: (
      <StepContent3 />
    ),
  },
  3: {
    icon: withProps(TrashIcon)({ className: classes.icon }),
    title: sportsbookui_starzbet_editBet_tutorial_remove,
    content: (
      <StepContent4 />
    ),
  },
};

const Step = memo(({ step }) => {
  const { icon, content } = steps[step];
  const [t] = useTranslation();

  return (
    <div className={classes.step}>
      {createElement(icon, { height: 60, width: 60, color: "active" })}

      <ThemedModalTextBlock>
        <ThemedModalText size={"xl"} capitalize>
          {t(steps[step].title)}
        </ThemedModalText>

        <ThemedModalText size={"md"} color={"dark"}>
          {content}
        </ThemedModalText>
      </ThemedModalTextBlock>
    </div>
  );
});
Step.displayName = "Step";

const Dot = memo(({ index, step, setStep }) => {
  const clickHandler: MouseEventHandler<HTMLDivElement> = (e) => setStep(+e.currentTarget.dataset.index);

  return (
    <div
      className={clsx(classes.dot, step >= index && classes.active, index > step && classes.passed)}
      data-index={index}
      onClick={clickHandler}
    >
      {step > index ? <CheckIcon color={"background"} /> : null}
    </div>
  );
});
Dot.displayName = "Dot";

const Dots = memo(({ step, setStep }) => (
  <div className={clsx(classes.dots, IS_MOBILE_CLIENT_SIDE && classes.mobile)}>
    {
      range(0, 3).map((index) => (
        <Fragment key={index}>
          <Dot
            index={index}
            step={step}
            setStep={setStep}
          />

          {index !== 3 ? <div className={classes.line} /> : null}
        </Fragment>
      ))
    }
  </div>
));
Dots.displayName = "Dots";

type  TBackButtonProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}
const BackButton = memo<TBackButtonProps>(
  ({ step, setStep }) => {
    const [t] = useTranslation();
    const back = () => setStep(decrement);

    return step > 0
      ? (
        <button className={classes.backButton} onClick={back}>
          <ChevronLeftIcon width={20} height={17} className={classes.backButtonIcon} />

          <Ellipsis className={classes.backButtonText}>
            {t(platformui_starzbet_button_back)}
          </Ellipsis>
        </button>
      )
      : <div className={classes.placeholder} />;
  },
);
BackButton.displayName = "BackButton";

const EditBetTutorial = memo(() => {
  const [t] = useTranslation();

  const [step, setStep] = useState(0);

  const [skipEditBetTutorial, toggleHandler, closeModal] = useSkipModal(EModal.editBetTutorial);

  const nextHandler = useCallback(
    () => {
      if (step === 3) {
        closeModal();

        return;
      }

      setStep(increment);
    },
    [step, closeModal],
  );

  return (
    <ThemedModal onCancel={closeModal}>
      <ThemedModalHeader closeButtonClickHandler={closeModal}>
        <BackButton step={step} setStep={setStep} />
      </ThemedModalHeader>

      <ThemedModalBody>
        <Step step={step} />

        <Dots
          step={step}
          setStep={setStep}
        />

        <Button colorScheme={"orange-gradient"} onClick={nextHandler}>
          <Ellipsis className={classes.buttonText}>
            {
              step === 3
                ? t(sportsbookui_starzbet_editBet_tutorial_button_startEdit)
                : t(sportsbookui_starzbet_editBet_tutorial_button_next)
            }
          </Ellipsis>
        </Button>

        <div className={classes.checkboxGroup} onClick={toggleHandler}>
          <CheckboxIcon checked={skipEditBetTutorial} color={skipEditBetTutorial ? "active" : "text"} />

          <div className={classes.checkboxText}>{t(sportsbookui_starzbet_modal_checkbox_dontShowThisMessageAgain)}</div>
        </div>
      </ThemedModalBody>
    </ThemedModal>
  );
});
EditBetTutorial.displayName = "EditBetTutorial";

export { EditBetTutorial };
