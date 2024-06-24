import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { getNotNil } from "@sb/utils";
import { type ISelectOption } from "../../../common/Components/Field/SelectModel";
import { countriesMap } from "../../Utils/CountriesUtils";

const CountryOption = memo<ISelectOption<string>>((option) => {
  const [t] = useTranslation();

  return t(getNotNil(countriesMap[option.value], ["CountryOption"], "countriesMap[option.value]"));
});
CountryOption.displayName = "CountryOption";

export { CountryOption };
