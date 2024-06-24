import unitedKingdom from "../Assets/united-kingdom.png";
import malta from "../Assets/malta.png";
import turkey from "../Assets/turkey.png";
import germany from "../Assets/germany.png";
import austria from "../Assets/austria.png";
import brazil from "../Assets/brazil.png";
import spain from "../Assets/spain.png";
import romania from "../Assets/romania.png";
import belgium from "../Assets/belgium.png";
import greece from "../Assets/greece.png";
import cyprus from "../Assets/cyprus.png";
import norway from "../Assets/norway.png";
import kyrgyzstan from "../Assets/kyrgyzstan.png";
import india from "../Assets/india.png";

const DEFAULT_PHONE_CODES = {
  GBR: "+44",
  IND: "+91",
  MLT: "+356",
  TUR: "+90",
  DEU: "+49",
  AUT: "+43",
  BRA: "+55",
  ESP: "+34",
  ROU: "+40",
  BEL: "+32",
  GRC: "+30",
  CYP: "+357",
  NOR: "+47",
  KGZ: "+996",
}

const DEFAULT_PHONE_CODES_LIST = Object.values(DEFAULT_PHONE_CODES);

const DEFAULT_PHONE_CODES_AND_FLAGS_LIST = [
  {
    code: DEFAULT_PHONE_CODES.GBR,
    flag: unitedKingdom,
  },
  {
    code: DEFAULT_PHONE_CODES.MLT,
    flag: malta,
  },
  {
    code: DEFAULT_PHONE_CODES.TUR,
    flag: turkey,
  },
  {
    code: DEFAULT_PHONE_CODES.DEU,
    flag: germany,
  },
  {
    code: DEFAULT_PHONE_CODES.AUT,
    flag: austria,
  },
  {
    code: DEFAULT_PHONE_CODES.BRA,
    flag: brazil,
  },
  {
    code: DEFAULT_PHONE_CODES.ESP,
    flag: spain,
  },
  {
    code: DEFAULT_PHONE_CODES.ROU,
    flag: romania,
  },
  {
    code: DEFAULT_PHONE_CODES.BEL,
    flag: belgium,
  },
  {
    code: DEFAULT_PHONE_CODES.GRC,
    flag: greece,
  },
  {
    code: DEFAULT_PHONE_CODES.CYP,
    flag: cyprus,
  },
  {
    code: DEFAULT_PHONE_CODES.NOR,
    flag: norway,
  },
  {
    code: DEFAULT_PHONE_CODES.KGZ,
    flag: kyrgyzstan,
  },
  {
    code: DEFAULT_PHONE_CODES.IND,
    flag: india,
  }
]

const DEFAULT_PHONE_CODE_TO_FLAG_MAP: Record<string, string> = DEFAULT_PHONE_CODES_AND_FLAGS_LIST
  .reduce((acc, { code, flag }) => ({ ...acc, [code]: flag }), {})

export {
  DEFAULT_PHONE_CODE_TO_FLAG_MAP,
  DEFAULT_PHONE_CODES_AND_FLAGS_LIST,
  DEFAULT_PHONE_CODES_LIST,
  DEFAULT_PHONE_CODES
}
