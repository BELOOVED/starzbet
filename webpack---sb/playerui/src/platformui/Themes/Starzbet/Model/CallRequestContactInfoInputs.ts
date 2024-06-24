import { ECallOptionName } from "@sb/betting-core/ECallOptionName";
import {
  platformui_starzbet_callRequests_title_username,
  platformui_starzbet_callRequests_placeholder_username,
  platformui_starzbet_callRequests_title_mobileNumber,
  platformui_starzbet_callRequests_placeholder_mobile,
  platformui_starzbet_callRequests_title_skypeInviteLink,
  platformui_starzbet_callRequests_placeholder_link,
  platformui_starzbet_callRequests_title_googleMeetLink,
  platformui_starzbet_callRequests_title_faceTimeLink,
  type TTKeys,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";

type TContactInfoInput = {
  title: TTKeys;
  placeholder: TTKeys;
};

const callRequestContactInfoInputs: Record<Exclude<ECallOptionName, "MOBILE">, TContactInfoInput> = {
  [ECallOptionName.FACEBOOK]: {
    title: platformui_starzbet_callRequests_title_username,
    placeholder: platformui_starzbet_callRequests_placeholder_username,
  },
  [ECallOptionName.INSTAGRAM]: {
    title: platformui_starzbet_callRequests_title_username,
    placeholder: platformui_starzbet_callRequests_placeholder_username,
  },
  [ECallOptionName.SIGNAL]: {
    title: platformui_starzbet_callRequests_title_mobileNumber,
    placeholder: platformui_starzbet_callRequests_placeholder_mobile,
  },
  [ECallOptionName.SKYPE]: {
    title: platformui_starzbet_callRequests_title_skypeInviteLink,
    placeholder: platformui_starzbet_callRequests_placeholder_link,
  },
  [ECallOptionName.TELEGRAM]: {
    title: platformui_starzbet_callRequests_title_username,
    placeholder: platformui_starzbet_callRequests_placeholder_username,
  },
  [ECallOptionName.TWITTER]: {
    title: platformui_starzbet_callRequests_title_username,
    placeholder: platformui_starzbet_callRequests_placeholder_username,
  },
  [ECallOptionName.WHATSAPP]: {
    title: platformui_starzbet_callRequests_title_mobileNumber,
    placeholder: platformui_starzbet_callRequests_placeholder_mobile,
  },
  [ECallOptionName.GOOGLE_MEET]: {
    title: platformui_starzbet_callRequests_title_googleMeetLink,
    placeholder: platformui_starzbet_callRequests_placeholder_link,
  },
  [ECallOptionName.FACE_TIME]: {
    title: platformui_starzbet_callRequests_title_faceTimeLink,
    placeholder: platformui_starzbet_callRequests_placeholder_link,
  },
};

export { callRequestContactInfoInputs };
