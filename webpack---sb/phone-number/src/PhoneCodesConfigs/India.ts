import india from "../Assets/india.png";

const INDIA_PHONE_CODES = {
  IND: "+91",
}

const INDIA_PHONE_CODES_LIST = Object.values(INDIA_PHONE_CODES);

const INDIA_PHONE_CODES_AND_FLAGS_LIST = [
  {
    code: INDIA_PHONE_CODES.IND,
    flag: india,
  }
]

const INDIA_PHONE_CODE_TO_FLAG_MAP: Record<string, string> = INDIA_PHONE_CODES_AND_FLAGS_LIST
  .reduce((acc, { code, flag }) => ({ ...acc, [code]: flag }), {})

export {
  INDIA_PHONE_CODE_TO_FLAG_MAP,
  INDIA_PHONE_CODES_AND_FLAGS_LIST,
  INDIA_PHONE_CODES_LIST,
  INDIA_PHONE_CODES
}
