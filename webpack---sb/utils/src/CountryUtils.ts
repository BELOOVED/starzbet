import { EAlpha3Code } from "./EAlpha3Code";
import { ICountry } from "./ICountry";
import { countryByIdMap } from "./CountryByIdMap";
import { countryByAlfa3Map } from "./CountryByAlfa3Map";

export const countryIds = Object.keys(countryByIdMap);

export const countries = Object.values(countryByIdMap);

export const getCountryByAlpha3 = (alpha3: EAlpha3Code): ICountry | undefined => {
  return countryByAlfa3Map[alpha3];
};

export const getCountryById = (id: string): ICountry | undefined => {
  return countryByIdMap[id];
};
