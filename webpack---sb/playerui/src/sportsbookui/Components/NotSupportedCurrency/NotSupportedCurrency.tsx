import { useSelector } from "react-redux";
import { memo } from "react";
import { sportsbookui_message_notSupportedCurrency } from "@sb/translates/sportsbookui/CommonTKeys";
import { useTranslation } from "@sb/translator";
import classes from "./NotSupportedCurrency.module.css";
import { modalSelector } from "../../../common/Store/Modal/Selectors/ModalSelectors";
import { EModal } from "../../../common/Store/Modal/Model/EModal";

const NotSupportedCurrency = memo(() => {
  const [t] = useTranslation();

  const modal = useSelector(modalSelector);
  const currency = modal[EModal.notSupportedCurrency];

  return (
    <div className={classes.overlay}>
      {t(sportsbookui_message_notSupportedCurrency, { currency })}
    </div>
  );
});
NotSupportedCurrency.displayName = "NotSupportedCurrency";

export { NotSupportedCurrency };
