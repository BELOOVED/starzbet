// @ts-nocheck
import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { ECallOptionName } from "@sb/betting-core/ECallOptionName";
import { ECallRequestStatus } from "@sb/graphql-client";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import classes from "./CallRequest.module.css";
import { When } from "../../../../../../common/Components/When";
import { defaultDateFormat, defaultTimeFormat } from "../../../../../../common/Themes/Starzbet/Constants/DefaultDateTimeFormat";
import { DateFormat } from "../../../../../../common/Components/Date/DateFormat";
import { callRequestStatusEnum, callRequestStatusTKeys } from "../../../../../Store/CallRequests/Model/CallRequests";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { CallRequestQRCode } from "../../../Components/CallRequestQrCode/CallRequestQrCode";
import { CancelCallRequestButton } from "../../../Components/CallRequest/CancelCallRequestButton/CancelCallRequestButton";

const statusClass = {
  [callRequestStatusEnum.PENDING]: classes.pending,
  [callRequestStatusEnum.REJECTED]: classes.rejected,
  [callRequestStatusEnum.CANCELED]: classes.canceled,
  [callRequestStatusEnum.FULFILLED]: classes.fulfilled,
};

const Header = memo(({
  status,
  slot,
  contactInfo,
}) => {
  const [t] = useTranslation();

  return (
    <div className={classes.ticketHeader} {...qaAttr(PlayerUIQaAttributes.RequestCallBackPage.RequestTicket_Header)}>
      <Ellipsis className={classes.dateAndContactInfo}>
        <div className={classes.date} {...qaAttr(PlayerUIQaAttributes.RequestCallBackPage.RequestTicket_Date)}>
          <DateFormat date={slot.startTime} format={`${defaultDateFormat} • ${defaultTimeFormat}`} />

          <DateFormat date={slot.endTime} format={` - ${defaultTimeFormat}`} />
        </div>

        <Ellipsis className={classes.contactInfo}>
          <div className={classes.dot} />

          {contactInfo}
        </Ellipsis>
      </Ellipsis>

      <div className={classes.statusContainer}>
        <Ellipsis
          className={clsx(classes.status, statusClass[status])}
          {...qaAttr(PlayerUIQaAttributes.RequestCallBackPage.RequestTicket_Status)}
        >
          {t(callRequestStatusTKeys[status])}
        </Ellipsis>
      </div>
    </div>
  );
});
Header.displayName = "Header";

const CallRequest = memo(({
  id,
  status,
  slot,
  contactInfo,
  description,
  callOptionName,
}) => {
  const withLink = callOptionName !== ECallOptionName.MOBILE && status === ECallRequestStatus.pending;

  return (
    <div className={classes.ticket} {...qaAttr(PlayerUIQaAttributes.RequestCallBackPage.RequestTicket_Container)}>
      <Header status={status} slot={slot} contactInfo={contactInfo} />

      <div className={classes.ticketBody}>
        <div className={classes.description} {...qaAttr(PlayerUIQaAttributes.RequestCallBackPage.RequestTicket_Message)}>
          {description}
        </div>

        <When condition={withLink}>
          <div className={classes.link}>
            <CallRequestQRCode
              className={classes.qrCodeLink}
              name={callOptionName}
              qaAttribute={PlayerUIQaAttributes.RequestCallBackPage.RequestTicket_QRCode}
            />
          </div>
        </When>
      </div>

      {status === callRequestStatusEnum.PENDING && <CancelCallRequestButton requestId={id} />}
    </div>
  );
});
CallRequest.displayName = "CallRequest";

export { CallRequest };
