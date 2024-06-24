import { EPhoneCodeCountry } from "./Model";
import {
  KYRGYZSTAN_PHONE_CODE_TO_FLAG_MAP,
  KYRGYZSTAN_PHONE_CODES,
  KYRGYZSTAN_PHONE_CODES_AND_FLAGS_LIST,
  KYRGYZSTAN_PHONE_CODES_LIST,
} from "./PhoneCodesConfigs/Kyrgyzstan";
import {
  INDIA_PHONE_CODE_TO_FLAG_MAP,
  INDIA_PHONE_CODES,
  INDIA_PHONE_CODES_AND_FLAGS_LIST,
  INDIA_PHONE_CODES_LIST,
} from "./PhoneCodesConfigs/India";
import {
  BRAZIL_PHONE_CODE_TO_FLAG_MAP,
  BRAZIL_PHONE_CODES,
  BRAZIL_PHONE_CODES_AND_FLAGS_LIST,
  BRAZIL_PHONE_CODES_LIST,
} from "./PhoneCodesConfigs/Brazil";
import {
  DEFAULT_PHONE_CODE_TO_FLAG_MAP,
  DEFAULT_PHONE_CODES,
  DEFAULT_PHONE_CODES_AND_FLAGS_LIST,
  DEFAULT_PHONE_CODES_LIST,
} from "./PhoneCodesConfigs/Default";
import { getNotNil, TExplicitAny } from "@sb/utils";


const PHONE_CODES_BY_COUNTRY: Record<EPhoneCodeCountry, Record<string, string>> = {
  [EPhoneCodeCountry.Default]: DEFAULT_PHONE_CODES,
  [EPhoneCodeCountry.India]: INDIA_PHONE_CODES,
  [EPhoneCodeCountry.Brazil]: BRAZIL_PHONE_CODES,
  [EPhoneCodeCountry.Kyrgyzstan]: KYRGYZSTAN_PHONE_CODES,
}

const PHONE_CODES_LIST_BY_COUNTRY: Record<EPhoneCodeCountry, string[]> = {
  [EPhoneCodeCountry.Default]: DEFAULT_PHONE_CODES_LIST,
  [EPhoneCodeCountry.India]: INDIA_PHONE_CODES_LIST,
  [EPhoneCodeCountry.Brazil]: BRAZIL_PHONE_CODES_LIST,
  [EPhoneCodeCountry.Kyrgyzstan]: KYRGYZSTAN_PHONE_CODES_LIST,
}

const PHONE_CODES_AND_FLAGS_LIST_BY_COUNTRY: Record<EPhoneCodeCountry, { code: string, flag: TExplicitAny }[]> = {
  [EPhoneCodeCountry.Default]: DEFAULT_PHONE_CODES_AND_FLAGS_LIST,
  [EPhoneCodeCountry.India]: INDIA_PHONE_CODES_AND_FLAGS_LIST,
  [EPhoneCodeCountry.Brazil]: BRAZIL_PHONE_CODES_AND_FLAGS_LIST,
  [EPhoneCodeCountry.Kyrgyzstan]: KYRGYZSTAN_PHONE_CODES_AND_FLAGS_LIST,
}

const PHONE_CODE_TO_FLAG_MAP_BY_COUNTRY: Record<EPhoneCodeCountry, Record<string, string>> = {
  [EPhoneCodeCountry.Default]: DEFAULT_PHONE_CODE_TO_FLAG_MAP,
  [EPhoneCodeCountry.India]: INDIA_PHONE_CODE_TO_FLAG_MAP,
  [EPhoneCodeCountry.Brazil]: BRAZIL_PHONE_CODE_TO_FLAG_MAP,
  [EPhoneCodeCountry.Kyrgyzstan]: KYRGYZSTAN_PHONE_CODE_TO_FLAG_MAP,
}

const getPhoneCodes = (country: EPhoneCodeCountry) =>
  getNotNil(PHONE_CODES_BY_COUNTRY[country], ["getPhoneCodes"], `Unknown country - ${country}`);

const getPhoneCodesList = (country: EPhoneCodeCountry) =>
  getNotNil(PHONE_CODES_LIST_BY_COUNTRY[country], ["getPhoneCodesList"], `Unknown country - ${country}`);

const getPhoneCodesAndFlagsList = (country: EPhoneCodeCountry) =>
  getNotNil(PHONE_CODES_AND_FLAGS_LIST_BY_COUNTRY[country], ["getPhoneCodesAndFlagsList"], `Unknown country - ${country}`);

const getPhoneCodesToFlag = (country: EPhoneCodeCountry) =>
  getNotNil(PHONE_CODE_TO_FLAG_MAP_BY_COUNTRY[country], ["getPhoneCodesToFlag"], `Unknown country - ${country}`);

export {
  getPhoneCodes,
  getPhoneCodesList,
  getPhoneCodesAndFlagsList,
  getPhoneCodesToFlag,
}
