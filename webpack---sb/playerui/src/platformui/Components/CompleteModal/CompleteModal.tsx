// @ts-nocheck
import clsx from "clsx";
import { memo } from "react";
import { type FormRenderProps } from "react-final-form";
import { useTranslation } from "@sb/translator";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { isNotNil } from "@sb/utils";
import {
  sportsbookui_betorspin_editBet_addSelectionTip_gotIt,
  sportsbookui_betorspin_subTitle_complete,
  sportsbookui_betorspin_title_complete,
} from "@sb/translates/sportsbookui/Themes/Betorspin/TKeys";
import classes from "./CompleteModal.module.css";

interface ICompleteModalProps {
  form?: FormRenderProps["form"];
  qaAttributeModalContainer?: string;
  qaAttributeCloseButton?: string;
  qaAttributeGotItButton?: string;
  qaAttributeTitle?: string;
  qaAttributeSubTitle?: string;
  topPosition?:boolean;
}

const CompleteModal = memo<ICompleteModalProps>(({
  handleClick,
  title = sportsbookui_betorspin_title_complete,
  subtitle = sportsbookui_betorspin_subTitle_complete,
  btn = sportsbookui_betorspin_editBet_addSelectionTip_gotIt,
  form,
  topPosition = false,
  qaAttributeModalContainer = PlayerUIQaAttributes.Modal.Container,
  qaAttributeCloseButton = PlayerUIQaAttributes.Modal.CloseButton,
  qaAttributeGotItButton = PlayerUIQaAttributes.Modal.OkButton,
  qaAttributeTitle = PlayerUIQaAttributes.Modal.Title,
  qaAttributeSubTitle = PlayerUIQaAttributes.Modal.SubTitle,
}) => {
  const [t] = useTranslation();

  const onClick = (e) => {
    e.stopPropagation();
    if (form) {
      setTimeout(form.reset);
    }
  };

  return (
    <div
      className={clsx(classes.complete, topPosition && classes.top)}
      onClick={onClick}
      {...qaAttr(qaAttributeModalContainer)}
    >
      <div className={classes.close} onClick={handleClick} {...qaAttr(qaAttributeCloseButton)} />

      <div className={classes.completeIcon} />

      <div className={classes.title} {...qaAttr(qaAttributeTitle)}>
        {t(title)}
      </div>

      {
        isNotNil(subtitle)
          ? (
            <div className={classes.subtitle} {...qaAttr(qaAttributeSubTitle)}>
              {t(subtitle)}
            </div>
          )
          : null
      }

      <div className={classes.gotItButton} onClick={handleClick} {...qaAttr(qaAttributeGotItButton)}>
        {t(btn)}
      </div>
    </div>
  );
});
CompleteModal.displayName = "CompleteModal";

export { CompleteModal };
