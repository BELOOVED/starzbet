// @ts-nocheck
import classes from "./CouponModal.module.css";
import { ThemedModal } from "../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModal";
import {
  ThemedModalHeader,
} from "../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModalHeader/ThemedModalHeader";
import { ThemedModalBody } from "../../../../../../../platformui/Themes/Starzbet/Components/ThemedModal/ThemedModalBody/ThemedModalBody";
import { EModal } from "../../../../../../../common/Store/Modal/Model/EModal";
import { useModalCloseAction } from "../../../../../../../common/Store/Modal/Hooks/UseModalCloseAction";

const CouponModal = ({ children, complete }) => {
  const closeHandler = useModalCloseAction(EModal.coupon);

  const modalClass = complete ? classes.complete : classes.modal;

  return (
    <ThemedModal onCancel={closeHandler} className={modalClass}>
      <ThemedModalHeader closeButtonClickHandler={closeHandler} />

      <ThemedModalBody className={classes.body}>
        {children}
      </ThemedModalBody>
    </ThemedModal>

  );
};
CouponModal.displayName = "CouponModal";

export { CouponModal };
