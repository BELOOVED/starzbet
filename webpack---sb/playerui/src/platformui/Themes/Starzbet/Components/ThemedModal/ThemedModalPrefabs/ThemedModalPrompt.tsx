import { memo, type ReactNode } from "react";
import { isNotNil } from "@sb/utils";
import { type TFuncWithPlain, useTranslation } from "@sb/translator";
import { platformui_starzbet_button_cancel, platformui_starzbet_button_ok } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { PlayerUIQaAttributes } from "@sb/qa-attributes";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { When } from "../../../../../../common/Components/When";
import { type TModalPromptActionProps } from "../../../../../../common/Store/Modal/Model/TModalPromptActionProps";
import { ThemedModal } from "../ThemedModal";
import { ThemedModalHeader } from "../ThemedModalHeader/ThemedModalHeader";
import { ThemedModalIcon, type TIconVariant } from "../ThemedModalIcon/ThemedModalIcon";
import { ThemedModalBody } from "../ThemedModalBody/ThemedModalBody";
import { ThemedModalText } from "../ThemedModalText/ThemedModalText";
import { ThemedModalButtonsRow } from "../ThemedModalButtonsRow/ThemedModalButtonsRow";
import { ThemedModalTextBlock } from "../ThemedModalTextBlock/ThemedModalTextBlock";

type TThemedModalPromptProps = TModalPromptActionProps & {
  title: Readonly<Parameters<TFuncWithPlain>>;
  header?: ReactNode;
  iconVariant?: TIconVariant;
  subtitle?: Readonly<Parameters<TFuncWithPlain>>;
  disableLockBodyScroll?: boolean;
}
const ThemedModalPrompt = memo<TThemedModalPromptProps>((
  {
    header,
    iconVariant,
    title,
    subtitle,
    okButtonText = [platformui_starzbet_button_ok],
    onOk,
    cancelButtonText = [platformui_starzbet_button_cancel],
    onCancel,
    disableLockBodyScroll,
    okLoading,
    cancelLoading,
  },
) => {
  const [t] = useTranslation();

  return (
    <ThemedModal onCancel={onCancel} disableLockBodyScroll={disableLockBodyScroll}>
      <ThemedModalHeader closeButtonClickHandler={onCancel}>{header}</ThemedModalHeader>

      <ThemedModalBody>
        {isNotNil(iconVariant) ? <ThemedModalIcon variant={iconVariant} /> : null}

        <ThemedModalTextBlock>
          <ThemedModalText size={"xl"}>
            {t(...title)}
          </ThemedModalText>

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
          <Button
            colorScheme={"blue-gradient"}
            capitalize
            onClick={onOk}
            wide={IS_MOBILE_CLIENT_SIDE}
            loading={okLoading}
            qaAttribute={PlayerUIQaAttributes.Modal.SubmitButton}
          >
            {t(...okButtonText)}
          </Button>

          <When condition={isNotNil(onCancel)}>
            <Button
              colorScheme={"secondary-grey"}
              capitalize
              onClick={onCancel}
              wide={IS_MOBILE_CLIENT_SIDE}
              loading={cancelLoading}
              qaAttribute={PlayerUIQaAttributes.Modal.RejectButton}
            >
              {t(...cancelButtonText)}
            </Button>
          </When>
        </ThemedModalButtonsRow>
      </ThemedModalBody>
    </ThemedModal>
  );
});
ThemedModalPrompt.displayName = "ThemedModalPrompt";

export { ThemedModalPrompt, type TThemedModalPromptProps };
