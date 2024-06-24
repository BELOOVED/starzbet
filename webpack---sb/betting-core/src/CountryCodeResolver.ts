import { EAlpha3Code, isNil, TNullable } from "@sb/utils";

enum ENotCastedToAlpha3Codes {
  england = "england",
  "england-amateur" = "england-amateur",
  wales = "wales",
  scotland = "scotland",
  "northern-ireland" = "northern-ireland",
  kosovo = "kosovo",
  international = "international",
}

enum ECastedToAlpha3Codes {
  "austria-amateur" = EAlpha3Code.AUT,
  "denmark-amateur" = EAlpha3Code.DNK,
  "germany-amateur" = EAlpha3Code.DEU,
  "spain-amateur" = EAlpha3Code.ESP,
  "sweden-amateur" = EAlpha3Code.SWE,
  "turkey-amateur" = EAlpha3Code.TUR,
  "england-amateur" = "england",
}

/**
 * If code is Alpha3, or it can be cast to Alpha3 we return EAlpha3Code.
 * If code isn't Alpha 3, and it cannot be cast to Alpha3 we return code.
 * If code is not contains in `ENotCastedToAlpha3Codes` and `ECastedToAlpha3Codes` we return ENotCastedToAlpha3Codes.international, as fallback.
 * @param code
 */
const countryCodeResolver = (code: TNullable<string>): EAlpha3Code | ENotCastedToAlpha3Codes => {
  if (isNil(code)) {
    return ENotCastedToAlpha3Codes.international;
  }

  if (EAlpha3Code[code]) {
    return EAlpha3Code[code];
  }

  if (ECastedToAlpha3Codes[code]) {
    return ECastedToAlpha3Codes[code];
  }

  if (ENotCastedToAlpha3Codes[code]) {
    return ENotCastedToAlpha3Codes[code];
  }

  return ENotCastedToAlpha3Codes.international;
};

export { ENotCastedToAlpha3Codes, countryCodeResolver };
