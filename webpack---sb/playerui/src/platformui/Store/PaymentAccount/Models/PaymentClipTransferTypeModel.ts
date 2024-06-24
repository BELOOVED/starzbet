import { EPlatform_PaymentClipTransferType } from "@sb/graphql-client";

const PAYMENT_CLIP_TRANSFER_TYPE_OPTIONS = Object.values(EPlatform_PaymentClipTransferType)
  .map((value) => ({ value }));

export { PAYMENT_CLIP_TRANSFER_TYPE_OPTIONS };
