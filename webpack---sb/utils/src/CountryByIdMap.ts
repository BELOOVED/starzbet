import { ICountry } from "./ICountry";
import { countryByAlfa3Map } from "./CountryByAlfa3Map";

const countryByIdMap = Object.values(countryByAlfa3Map).reduce(
  (acc, country) => ({ ...acc, [country.id]: country }),
  {} as Record<string, ICountry>,
);

export { countryByIdMap };
