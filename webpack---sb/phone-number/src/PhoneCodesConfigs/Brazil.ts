import unitedKingdom from "../Assets/united-kingdom.png";
import brazil from "../Assets/brazil.png";
import spain from "../Assets/spain.png";

const BRAZIL_PHONE_CODES = {
  GBR: "+44",
  BRA: "+55",
  ESP: "+34",
}

const BRAZIL_PHONE_CODES_LIST = Object.values(BRAZIL_PHONE_CODES);

const BRAZIL_PHONE_CODES_AND_FLAGS_LIST = [
  {
    code: BRAZIL_PHONE_CODES.GBR,
    flag: unitedKingdom,
  },
  {
    code: BRAZIL_PHONE_CODES.BRA,
    flag: brazil,
  },
  {
    code: BRAZIL_PHONE_CODES.ESP,
    flag: spain,
  },
]

const BRAZIL_PHONE_CODE_TO_FLAG_MAP: Record<string, string> = BRAZIL_PHONE_CODES_AND_FLAGS_LIST
  .reduce((acc, { code, flag }) => ({ ...acc, [code]: flag }), {})

export {
  BRAZIL_PHONE_CODE_TO_FLAG_MAP,
  BRAZIL_PHONE_CODES_AND_FLAGS_LIST,
  BRAZIL_PHONE_CODES_LIST,
  BRAZIL_PHONE_CODES
}
