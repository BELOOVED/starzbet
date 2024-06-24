import { EAlpha3Code } from "./EAlpha3Code";
import { EAlpha2Code } from "./EAlpha2Code";
import { countryByAlfa3Map } from "./CountryByAlfa3Map";

export const alpha2CodeToAlpha3CodeMap: Record<EAlpha2Code, EAlpha3Code> =
  Object
    .values(countryByAlfa3Map)
    .reduce((acc, country) =>
      ({ ...acc, [country.alpha2]: country.alpha3 }), {} as Record<EAlpha2Code, EAlpha3Code>);
