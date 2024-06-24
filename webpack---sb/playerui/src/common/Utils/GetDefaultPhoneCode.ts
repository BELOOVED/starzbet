import { DEFAULT_PHONE_CODES, EPhoneCodeCountry, getPhoneCodesToFlag } from "@sb/phone-number";
import { IS_BRAZIL } from "../../platformui/Utils/RegionCheck";
import { IS_STARZBET_IN, IS_STARZBET_KG } from "../../ServerEnvironment";

const getCountryForPhoneCodes = () => {
  if (IS_BRAZIL) {
    return EPhoneCodeCountry.Brazil;
  }

  if (IS_STARZBET_KG) {
    return EPhoneCodeCountry.Kyrgyzstan;
  }

  if (IS_STARZBET_IN) {
    return EPhoneCodeCountry.India;
  }

  return EPhoneCodeCountry.Default;
};

const phoneCodeCountry = getCountryForPhoneCodes();

const phoneCodeToFlagMap = getPhoneCodesToFlag(phoneCodeCountry);

const getDefaultPhoneCode = () => {
  if (IS_BRAZIL) {
    return DEFAULT_PHONE_CODES.BRA;
  }

  if (IS_STARZBET_KG) {
    return DEFAULT_PHONE_CODES.KGZ;
  }

  if (IS_STARZBET_IN) {
    return DEFAULT_PHONE_CODES.IND;
  }

  return DEFAULT_PHONE_CODES.TUR;
};

export { getDefaultPhoneCode, phoneCodeToFlagMap, phoneCodeCountry };
