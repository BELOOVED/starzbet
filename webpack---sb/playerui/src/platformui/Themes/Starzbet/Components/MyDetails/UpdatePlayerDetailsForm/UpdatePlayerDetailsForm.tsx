import { memo } from "react";
import { useSelector } from "react-redux";
import { withProps } from "@sb/utils";
import {
  platformui_starzbet_headline_address,
  platformui_starzbet_headline_country,
  platformui_starzbet_headline_dateOfBirth,
  platformui_starzbet_headline_firstName,
  platformui_starzbet_headline_identificationNumber,
  platformui_starzbet_headline_postcode,
  platformui_starzbet_headline_surname,
  platformui_starzbet_headline_townCity,
  platformui_starzbet_placeholder_email,
  platformui_starzbet_placeholder_mobile,
  platformui_starzbet_placeholder_username,
  platformui_starzbet_verify_notVerifiedEmailHint,
  platformui_starzbet_verify_notVerifiedPhoneHint,
  platformui_starzbet_verify_verifyNow,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./UpdatePlayerDetailsForm.module.css";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { SelectField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/SelectField";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { EditIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/EditIcon/EditIcon";
import { useModalOpenAction } from "../../../../../../common/Store/Modal/Hooks/UseModaOpenAction";
import { EModal } from "../../../../../../common/Store/Modal/Model/EModal";
import { EUpdatePlayerEmailStep } from "../../../../../../common/Store/Player/Model/EUpdatePlayerEmailStep";
import { EUpdatePlayerPhoneNumberStep } from "../../../../../../common/Store/Player/Model/EUpdatePlayerPhoneNumberStep";
import { isPrivatePlayerSelector } from "../../../../../../common/Store/Player/Selectors/PlayerSelectors";
import { UpdatePlayerDetailsFormFactory } from "../../../../../Components/UpdatePlayerDetailsFormFactory/UpdatePlayerDetailsFormFactory";
import {
  UpdatePlayerDetailsFormEmailCaptionFactory,
  UpdatePlayerDetailsFormPhoneNumberCaptionFactory,
} from "../../../../../Components/UpdatePlayerDetailsFormFactory/UpdatePlayerDetailsFormCaptionFactory";
import { VerifyPhoneModal } from "../VerifyPhoneModal/VerifyPhoneModal";

const EmailCaption = withProps(UpdatePlayerDetailsFormEmailCaptionFactory)({
  captionTKey: platformui_starzbet_verify_notVerifiedEmailHint,
  captionClassName: classes.hint,
});

const PhoneNumberCaption = withProps(UpdatePlayerDetailsFormPhoneNumberCaptionFactory)({
  captionClassName: classes.hint,
  captionTKey: platformui_starzbet_verify_notVerifiedPhoneHint,
  verifyNowClassName: classes.verifyNow,
  verifyNowTKey: platformui_starzbet_verify_verifyNow,
});

const EditEmailButton = memo(() => {
  const openModal = useModalOpenAction(EModal.updateEmail, EUpdatePlayerEmailStep.EMAIL);

  return (
    <div className={classes.iconWrapper} onClick={openModal}>
      <EditIcon size={"xs"} color={"brand"} />
    </div>
  );
});
EditEmailButton.displayName = "EditEmailButton";

const EditPhoneNumberButton = memo(() => {
  const openModal = useModalOpenAction(EModal.updatePhoneNumber, EUpdatePlayerPhoneNumberStep.PHONE);
  const isPrivatePlayer = useSelector(isPrivatePlayerSelector);

  return isPrivatePlayer
    ? null
    : (
      <div className={classes.iconWrapper} onClick={openModal}>
        <EditIcon size={"xs"} color={"brand"} />
      </div>
    );
});
EditPhoneNumberButton.displayName = "EditPhoneNumberButton";

const EmailField = withProps(TextField)({ postfix: EditEmailButton });

const PhoneNumberField = withProps(TextField)({ postfix: EditPhoneNumberButton });

const UpdatePlayerDetailsFormContent = withProps(UpdatePlayerDetailsFormFactory)({
  name: {
    labelTKey: platformui_starzbet_headline_firstName,
    component: TextField,
  },
  surname: {
    labelTKey: platformui_starzbet_headline_surname,
    component: TextField,
  },
  identityNumber: {
    labelTKey: platformui_starzbet_headline_identificationNumber,
    component: TextField,
  },
  login: {
    labelTKey: platformui_starzbet_placeholder_username,
    component: TextField,
  },
  email: {
    labelTKey: platformui_starzbet_placeholder_email,
    component: EmailField,
    caption: <EmailCaption />,
  },
  phoneNumber: {
    labelTKey: platformui_starzbet_placeholder_mobile,
    component: PhoneNumberField,
    caption: <PhoneNumberCaption />,
  },
  dateOfBirth: {
    labelTKey: platformui_starzbet_headline_dateOfBirth,
    component: TextField,
  },
  country: {
    labelTKey: platformui_starzbet_headline_country,
    component: SelectField<string>,
  },
  townCity: {
    labelTKey: platformui_starzbet_headline_townCity,
    component: TextField,
  },
  address: {
    labelTKey: platformui_starzbet_headline_address,
    component: TextField,
  },
  postcode: {
    labelTKey: platformui_starzbet_headline_postcode,
    component: TextField,
  },
  fallbackContent: Loader,
  className: classes.container,
});

const UpdatePlayerDetailsForm = memo(() => (
  <>
    <UpdatePlayerDetailsFormContent />

    <VerifyPhoneModal />
  </>
));
UpdatePlayerDetailsForm.displayName = "UpdatePlayerDetailsForm";

export { UpdatePlayerDetailsForm };
