import { CountryCode, getExampleNumber, isSupportedCountry, parsePhoneNumberFromString, PhoneNumber } from "libphonenumber-js";
import { EAlpha2Code } from "@sb/utils/EAlpha2Code";
import { EAlpha3Code, ELocale } from "@sb/utils";
import { alpha2CodeToAlpha3CodeMap } from "@sb/utils/Alpha2CodeToAlpha3CodeMap";
import metadata from "libphonenumber-js/metadata.min.json";
import examples from "libphonenumber-js/examples.mobile.json";
import { keys } from "@sb/utils/Keys";

const replaceSpaces = (value: string) => value.split(" ").join("");

const normalizePlus = (value: string) => value.includes("+") ? value : `+${value}`;

const parsePhoneNumber = (phone: string): PhoneNumber | null | undefined => {
  try {
    return parsePhoneNumberFromString(normalizePlus(replaceSpaces(phone)));
  } catch (e) {
    return null;
  }
};

const parsePhoneCountry = (phone: string) => {
  const data = parsePhoneNumber(phone);

  if (!data) {
    return null;
  }

  return data.country;
};

const parsePhoneNationalNumber = (phone: string) => {
  const data = parsePhoneNumber(phone);

  if (!data) {
    return null;
  }

  return data.nationalNumber;
};


const isValidPhoneNumber = (phone: string) => {
  const phoneNumber = parsePhoneNumber(phone);

  return !(!phoneNumber || !phoneNumber.isValid());
};

const isAlpha2Code = (countryCode: string): countryCode is EAlpha2Code => countryCode in EAlpha2Code

const getAlpha3CodeByPhoneNumber = (phone: string | undefined): EAlpha3Code | undefined => {
  if (!phone) {
    return undefined;
  }

  const code = parsePhoneCountry(phone);

  return (code && isAlpha2Code(code)) ? alpha2CodeToAlpha3CodeMap[code] : undefined;
}

const getPhoneNumberMask = (isoCode: CountryCode): string | undefined => {
  const phoneNumber = getExampleNumber(isoCode, examples);
  return isSupportedCountry(isoCode) ? phoneNumber?.formatInternational() : "";
}

const getISOCodeFromLocale = (locale: ELocale | undefined): CountryCode | undefined => {
  const ISOCodes: CountryCode[] = keys(metadata.countries);
  return ISOCodes.find((code) => locale?.includes(code));
}

export {
  parsePhoneNumber,
  parsePhoneCountry,
  parsePhoneNationalNumber,
  isValidPhoneNumber,
  isAlpha2Code,
  getAlpha3CodeByPhoneNumber,
  metadata as countryCallingCodeMetadata,
  getPhoneNumberMask,
  getISOCodeFromLocale
}
