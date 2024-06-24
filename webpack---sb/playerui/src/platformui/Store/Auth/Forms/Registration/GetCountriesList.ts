import { countries, type EAlpha3Code } from "@sb/utils";
import { excludedRegistrationCountries } from "../../../../Utils/CountriesUtils";

const getCountriesList = (defaultCode: EAlpha3Code, firstCountries: EAlpha3Code[] = [defaultCode]) => {
  const countriesList = countries.filter(
    (it) => !excludedRegistrationCountries.includes(it.alpha3) && it.alpha3 !== defaultCode,
  );
  const firstCountriesList = countries.filter((it) => firstCountries.includes(it.alpha3)).map((it) => it.id);

  const result = firstCountriesList.map((id) => ({ value: id }));

  countriesList.forEach(({ id }) => {
    if (!firstCountriesList.includes(id)) {
      result.push({ value: id });
    }
  });

  return result;
};

export { getCountriesList };
