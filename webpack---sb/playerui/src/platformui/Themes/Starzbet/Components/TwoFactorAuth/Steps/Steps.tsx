import { createElement, memo } from "react";
import { useSelector } from "react-redux";
import type { QRCodeToDataURLOptions } from "qrcode";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_2fa_activateSteps_connectApp,
  platformui_starzbet_2fa_activateSteps_downloadApp,
  platformui_starzbet_2fa_activateSteps_enterCode,
  platformui_starzbet_2fa_activateSteps_scanCodeOrCopy,
  platformui_starzbet_2fa_deactivateStep_enterCode,
  type TTKeys,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { type TComponent, withProps } from "@sb/utils";
import classes from "./Steps.module.css";
import { Space } from "../../../../../../common/Components/Space/Space";
import { AppStoreLabel, PlayMarketLabel } from "../../../../../../common/Components/GoogleAuthenticatorLabels/GoogleAuthenticatorLabels";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { twoFactorAuthPropertySelectors } from "../../../../../Store/TwoFactorAuth/TwoFactorAuthSelectors";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { QRCode } from "../../../../../Components/QrCode/QRCode";
import { Copy } from "../../Copy/Copy";
import { TwoFactorAuthActivateForm, TwoFactorAuthDeactivateForm } from "../TwoFactorAuthPageForms/TwoFactorAuthPageForm";

interface IStepCounterProps {
  step: number;
}

const StepCounter = memo<IStepCounterProps>(({ step }) => (
  <div className={classes.stepCounter}>
    {step}
  </div>
));
StepCounter.displayName = "StepCounter";

interface IStepProps extends Partial<IStepCounterProps> {
  title: TTKeys;
  content: TComponent;
}

const Step = memo<IStepProps>(({
  content,
  step,
  title,
}) => {
  const [t] = useTranslation();

  return (
    <Space vertical value={16} className={classes.step}>
      <Space value={10} className={classes.stepTitle}>
        {step ? <StepCounter step={step} /> : null}

        <div>{t(title)}</div>
      </Space>

      {createElement(content)}
    </Space>
  );
});
Step.displayName = "Step";

const DownloadAppContent = memo(() => (
  <Space value={12}>
    <PlayMarketLabel />

    <AppStoreLabel />
  </Space>
));
DownloadAppContent.displayName = "DownloadAppContent";

const CopyRow = memo(() => {
  const secret = useSelector(twoFactorAuthPropertySelectors.secret);

  return (
    <Copy
      text={secret}
      node={<Ellipsis className={classes.secret}>{secret}</Ellipsis>}
      className={classes.copyRow}
    />
  );
});
CopyRow.displayName = "CopyRow";

const QR_CODE_OPTIONS: QRCodeToDataURLOptions = {
  margin: 2,
  width: IS_MOBILE_CLIENT_SIDE ? 200 : 140,
  color: {
    dark: "#000000FF",
    light: "#FFFFFFFF",
  },
};

const ConnectAuthenticatorContent = memo(() => {
  const [t] = useTranslation();
  const uri = useSelector(twoFactorAuthPropertySelectors.uri);

  return (
    <Space value={IS_MOBILE_CLIENT_SIDE ? 16 : 8} wide vertical={IS_MOBILE_CLIENT_SIDE}>
      {IS_MOBILE_CLIENT_SIDE ? <div className={classes.stepSubtitle}>{t(platformui_starzbet_2fa_activateSteps_scanCodeOrCopy)}</div> : null}

      <QRCode link={uri} className={classes.qr} options={QR_CODE_OPTIONS} />

      <Space vertical value={8} className={classes.copyBlock}>
        {
          IS_MOBILE_CLIENT_SIDE
            ? null
            : <div className={classes.stepSubtitle}>{t(platformui_starzbet_2fa_activateSteps_scanCodeOrCopy)}</div>
        }

        <CopyRow />
      </Space>
    </Space>
  );
});
ConnectAuthenticatorContent.displayName = "ConnectAuthenticatorContent";

const STEPS: Omit<IStepProps, "step">[] = [
  {
    title: platformui_starzbet_2fa_activateSteps_downloadApp,
    content: DownloadAppContent,
  },
  {
    title: platformui_starzbet_2fa_activateSteps_connectApp,
    content: ConnectAuthenticatorContent,
  },
  {
    title: platformui_starzbet_2fa_activateSteps_enterCode,
    content: TwoFactorAuthActivateForm,
  },
];

const ActivateSteps = memo(() => (
  <Space value={10} vertical>
    {
      STEPS.map((it, index) => (
        <Step {...it} step={index + 1} key={index} />
      ))
    }
  </Space>
));
ActivateSteps.displayName = "ActivateSteps";

const DeactivateStep = withProps(Step)({
  content: TwoFactorAuthDeactivateForm,
  title: platformui_starzbet_2fa_deactivateStep_enterCode,
});

export { ActivateSteps, DeactivateStep };
