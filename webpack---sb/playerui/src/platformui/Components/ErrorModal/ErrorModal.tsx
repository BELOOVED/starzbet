import clsx from "clsx";
import { memo } from "react";
import { type IOptions, useTranslation } from "@sb/translator";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import {
  platformui_editBet_addSelectionTip_gotIt,
  platformui_subTitle_wrong,
  platformui_title_wrong,
} from "@sb/translates/platformui/CommonTKeys";
import { noopStopPropagation } from "@sb/utils";
import classes from "./ErrorModal.module.css";
import { useLockBodyScroll } from "../../../common/Hooks/UseLockBodyScroll";
import { WarningIcon } from "../../../common/Themes/Baywin/Components/Icons/WarningIcon/WarningIcon";
import { TranslateErrorMessage } from "../../Store/Form/Model/TranslateErrorMessage";

interface IErrorModalProps {
  handleClick: () => void;
  handleCloseClick?: () => void;
  subtitle: string | TranslateErrorMessage;
  title: string | TranslateErrorMessage;
  titleClick?: string;
  qaAttributeModalContainer?: string;
  qaAttributeCloseButton?: string;
  qaAttributeGotItButton?: string;
  qaAttributeSubtitle?: string;
  capitalizeText?: boolean;
  options?: IOptions;
  isWarning?: boolean;
  className?: string;
}

const ErrorModal = memo<IErrorModalProps>(({
  handleClick,
  handleCloseClick = handleClick,
  subtitle = platformui_subTitle_wrong,
  title = platformui_title_wrong,
  titleClick = platformui_editBet_addSelectionTip_gotIt,
  qaAttributeModalContainer = PlayerUIQaAttributes.Modal.Container,
  qaAttributeCloseButton = PlayerUIQaAttributes.Modal.CloseButton,
  qaAttributeGotItButton = PlayerUIQaAttributes.Modal.OkButton,
  qaAttributeSubtitle = PlayerUIQaAttributes.Modal.SubTitle,
  // eslint-disable-next-line rulesdir/no-truethly-default-assign
  capitalizeText = true,
  options,
  isWarning = false,
  className,
}) => {
  const [t] = useTranslation();
  useLockBodyScroll();

  const titleMessage = title instanceof TranslateErrorMessage
    ? t(title.translateKey, title.options)
    : t(title);

  //TODO
  const subtitleMessage = subtitle instanceof TranslateErrorMessage
    ? t(subtitle.translateKey, subtitle.options)
    : t(subtitle, options);

  return (
    <div className={clsx(classes.error, className)} onClick={noopStopPropagation} {...qaAttr(qaAttributeModalContainer)}>
      <div className={classes.close} onClick={handleCloseClick} {...qaAttr(qaAttributeCloseButton)} />

      <div className={classes.iconContainer}>
        {
          isWarning
            ? <WarningIcon color={"warning"} size={"xxxl"} className={classes.warningIcon} />
            : <div className={classes.errorIcon} />
        }
      </div>

      <div className={clsx(classes.title, capitalizeText && classes.capitalize)}>
        {titleMessage}
      </div>

      <div className={clsx(classes.subtitle, capitalizeText && classes.capitalize)} {...qaAttr(qaAttributeSubtitle)}>
        {subtitleMessage}
      </div>

      <div className={classes.gotItButton} onClick={handleClick} {...qaAttr(qaAttributeGotItButton)}>
        {t(titleClick)}
      </div>
    </div>
  );
});
ErrorModal.displayName = "ErrorModal";

export { ErrorModal, type IErrorModalProps };
