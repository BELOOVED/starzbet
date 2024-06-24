import { memo } from "react";
import { useTranslation, type TFuncWithPlain } from "@sb/translator";
import { platformui_button_gotIt } from "@sb/translates/platformui/CommonTKeys";
import { isNotNil, type TVoidFn, withProps } from "@sb/utils";
import { platformui_starzbet_message_failed, platformui_starzbet_message_success } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { PlayerUIQaAttributes } from "@sb/qa-attributes";
import { ThemedModal } from "../ThemedModal";
import { ThemedModalHeader } from "../ThemedModalHeader/ThemedModalHeader";
import { ThemedModalText, type TThemedModalTextColor } from "../ThemedModalText/ThemedModalText";
import { ThemedModalIcon, type TIconVariant } from "../ThemedModalIcon/ThemedModalIcon";
import { ThemedModalButton } from "../ThemedModalButton/ThemedModalButton";
import { ThemedModalBody } from "../ThemedModalBody/ThemedModalBody";
import { ThemedModalButtonsRow } from "../ThemedModalButtonsRow/ThemedModalButtonsRow";
import { ThemedModalTextBlock } from "../ThemedModalTextBlock/ThemedModalTextBlock";

type TThemedModalMessageProps = {
  headerText?: Readonly<Parameters<TFuncWithPlain>>;
  headerTextColor?: TThemedModalTextColor;
  title?: Readonly<Parameters<TFuncWithPlain>>;
  subtitle?: Readonly<Parameters<TFuncWithPlain>>;
  iconVariant: TIconVariant;
  hideModal: TVoidFn;
  okButtonText?: Readonly<Parameters<TFuncWithPlain>>;
  qaAttribute?: string;
  okButtonHandler?: TVoidFn;
}

const ThemedModalMessage = memo<TThemedModalMessageProps>((
  {
    title,
    subtitle,
    headerText,
    headerTextColor,
    hideModal,
    iconVariant,
    okButtonText = [platformui_button_gotIt],
    qaAttribute = PlayerUIQaAttributes.Modal.OkButton,
    okButtonHandler = hideModal,
  },
) => {
  const [t] = useTranslation();

  return (
    <ThemedModal onCancel={hideModal}>
      <ThemedModalHeader closeButtonClickHandler={hideModal}>
        {
          isNotNil(headerText)
            ? (
              <ThemedModalText color={headerTextColor} size={"lg"}>
                {t(...headerText)}
              </ThemedModalText>

            )
            : null
        }
      </ThemedModalHeader>

      <ThemedModalBody>
        <ThemedModalIcon variant={iconVariant} />

        <ThemedModalTextBlock>
          {
            isNotNil(title)
              ? (
                <ThemedModalText size={"xl"}>
                  {t(...title)}
                </ThemedModalText>
              )
              : null
          }

          {
            isNotNil(subtitle)
              ? (
                <ThemedModalText size={"md"} color={"dark"}>
                  {t(...subtitle)}
                </ThemedModalText>
              )
              : null

          }
        </ThemedModalTextBlock>

        <ThemedModalButtonsRow>
          <ThemedModalButton onClick={okButtonHandler} qaAttribute={qaAttribute}>
            {t(...okButtonText)}
          </ThemedModalButton>
        </ThemedModalButtonsRow>
      </ThemedModalBody>
    </ThemedModal>
  );
});
ThemedModalMessage.displayName = "ThemedModalMessage";

const ThemedModalWarningMessage = withProps(ThemedModalMessage)({
  iconVariant: "warning",
  headerTextColor: "warning",
});
ThemedModalWarningMessage.displayName = "ThemedModalWarningMessage";

const ThemedModalErrorMessage = withProps(ThemedModalMessage)({
  iconVariant: "error",
  headerText: [platformui_starzbet_message_failed],
  headerTextColor: "error",
});
ThemedModalErrorMessage.displayName = "ThemedModalErrorMessage";

const ThemedModalSuccessMessage = withProps(ThemedModalMessage)({
  iconVariant: "success",
  headerText: [platformui_starzbet_message_success],
  headerTextColor: "success",
});
ThemedModalSuccessMessage.displayName = "ThemedModalSuccessMessage";

export {
  ThemedModalWarningMessage,
  ThemedModalErrorMessage,
  ThemedModalSuccessMessage,
  ThemedModalMessage,
};
