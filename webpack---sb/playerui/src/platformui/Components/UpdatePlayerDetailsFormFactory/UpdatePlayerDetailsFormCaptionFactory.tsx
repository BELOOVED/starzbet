import { memo } from "react";
import { not, useAction, withCondition } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import {
  verifiedEmailVerificationTokenSelector,
  verifiedPhoneVerificationTokenSelector,
} from "../../../common/Store/Player/Selectors/VerificationTokensSelectors";
import { showVerifyPhoneModalAction } from "../../../common/Store/Player/PlayerActions";

interface IUpdatePlayerDetailsFormEmailCaptionFactoryProps {
  captionClassName: string | undefined;
  captionTKey: string;
}

const UpdatePlayerDetailsFormEmailCaptionFactory = withCondition(
  not(verifiedEmailVerificationTokenSelector),
  memo<IUpdatePlayerDetailsFormEmailCaptionFactoryProps>(({ captionTKey, captionClassName }) => {
    const [t] = useTranslation();

    return (
      <div className={captionClassName}>
        {t(captionTKey)}
      </div>
    );
  }),
);
UpdatePlayerDetailsFormEmailCaptionFactory.displayName = "UpdatePlayerDetailsFormEmailCaptionFactory";

interface IUpdatePlayerDetailsFormPhoneNumberCaptionFactoryProps extends IUpdatePlayerDetailsFormEmailCaptionFactoryProps {
  verifyNowClassName: string | undefined;
  verifyNowTKey: string;
}

const UpdatePlayerDetailsFormPhoneNumberCaptionFactory = withCondition(
  not(verifiedPhoneVerificationTokenSelector),
  memo<IUpdatePlayerDetailsFormPhoneNumberCaptionFactoryProps>(({
    captionTKey,
    captionClassName,
    verifyNowClassName,
    verifyNowTKey,
  }) => {
    const show = useAction(showVerifyPhoneModalAction);

    const [t] = useTranslation();

    return (
      <div className={captionClassName}>
        {t(captionTKey)}

        <span className={verifyNowClassName} onClick={show} {...qaAttr(PlayerUIQaAttributes.DetailsPage.VerifyMobileNumberNowButton)}>
          {t(verifyNowTKey)}
        </span>
      </div>

    );
  }),
);
UpdatePlayerDetailsFormPhoneNumberCaptionFactory.displayName = "UpdatePlayerDetailsFormPhoneNumberCaptionFactory";

export { UpdatePlayerDetailsFormEmailCaptionFactory, UpdatePlayerDetailsFormPhoneNumberCaptionFactory };
