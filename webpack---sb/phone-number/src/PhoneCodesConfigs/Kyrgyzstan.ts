import kazakhstan from "../Assets/kazakhstan.png";
import georgia from "../Assets/georgia.png";
import uzbekistan from "../Assets/uzbekistan.png";
import russia from "../Assets/russia.png";
import kyrgyzstan from "../Assets/kyrgyzstan.png";

// TODO Fix PUI PhoneNumberInput - then remove space from KAZ code
const KYRGYZSTAN_PHONE_CODES = {
  KGZ: "+996",
  KAZ: "+7 ",
  RUS: "+7",
  UZB: "+998",
  GEO: "+995"
}

const KYRGYZSTAN_PHONE_CODES_LIST = Object.values(KYRGYZSTAN_PHONE_CODES);

const KYRGYZSTAN_PHONE_CODES_AND_FLAGS_LIST = [
  {
    code: KYRGYZSTAN_PHONE_CODES.KGZ,
    flag: kyrgyzstan,
  },
  {
    code: KYRGYZSTAN_PHONE_CODES.KAZ,
    flag: kazakhstan,
  },
  {
    code: KYRGYZSTAN_PHONE_CODES.RUS,
    flag: russia,
  },
  {
    code: KYRGYZSTAN_PHONE_CODES.UZB,
    flag: uzbekistan,
  },
  {
    code: KYRGYZSTAN_PHONE_CODES.GEO,
    flag: georgia,
  },
]

const KYRGYZSTAN_PHONE_CODE_TO_FLAG_MAP: Record<string, string> = KYRGYZSTAN_PHONE_CODES_AND_FLAGS_LIST
  .reduce((acc, { code, flag }) => ({ ...acc, [code]: flag }), {})

export {
  KYRGYZSTAN_PHONE_CODE_TO_FLAG_MAP,
  KYRGYZSTAN_PHONE_CODES_AND_FLAGS_LIST,
  KYRGYZSTAN_PHONE_CODES_LIST,
  KYRGYZSTAN_PHONE_CODES
}
