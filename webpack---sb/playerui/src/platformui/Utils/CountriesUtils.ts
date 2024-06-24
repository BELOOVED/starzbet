import { countries, EAlpha3Code, type ICountry } from "@sb/utils";
import { alpha3CodeTKeys } from "@sb/betting-core/SharedTKeys/Alpha3CodeTKeys";
import { type TSharedKey } from "@sb/translates/shared/SharedTKeys";
import { toSelectOption } from "../../common/Components/Field/SelectModel";

const getCountriesMap = (source: ICountry[]): Record<string, TSharedKey> => (
  source.reduce((acc, cur) => ({ ...acc, [cur.id]: alpha3CodeTKeys[cur.alpha3] }), {})
);

const countriesMap = getCountriesMap(countries);

const countriesOptions = countries.map(({ id }) => toSelectOption(id));

const excludedRegistrationCountries = [
  EAlpha3Code.ABW,
  EAlpha3Code.AUT,
  EAlpha3Code.BES,
  EAlpha3Code.CUW,
  EAlpha3Code.CYP,
  EAlpha3Code.FRA,
  EAlpha3Code.NLD,
  EAlpha3Code.AUS,
  EAlpha3Code.GBR,
  EAlpha3Code.ESP,
  EAlpha3Code.BES,
  EAlpha3Code.SXM,
  EAlpha3Code.MAF,
  EAlpha3Code.LTU,
  EAlpha3Code.USA,
];

export {
  countriesMap,
  countriesOptions,
  excludedRegistrationCountries,
};
