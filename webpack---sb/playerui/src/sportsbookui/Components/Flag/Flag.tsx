import { memo } from "react";
import { countryCodeResolver, ENotCastedToAlpha3Codes } from "@sb/betting-core/CountryCodeResolver";
import { isNil, useParamSelector } from "@sb/utils";
import { categoryIconByIdSelector } from "../../Store/Feed/Selectors/FeedSelectors";
import { EVirtualCategorySlug } from "../../Store/Virtual/Common/Model/CategorySlugWithLeague";

const flags = require.context("./Assets", true);

const getUrl = (path: string) => flags(path);

const getSrc = (country: string | null | undefined) => {
  if (isNil(country)) {
    return getUrl("./international.png");
  }
  try {
    if (EVirtualCategorySlug[country]) {
      return getUrl(`./${EVirtualCategorySlug[country]}.png`);
    }

    const resolvedCountryCode = countryCodeResolver(country);

    return getUrl(resolvedCountryCode === ENotCastedToAlpha3Codes["england-amateur"] ? "./england.png" : `./${resolvedCountryCode}.png`);
  } catch (e) {
    return getUrl("./international.png");
  }
};

interface IFlagProps {
  country: string | null | undefined;
}

const Flag = memo<IFlagProps>(({ country }) => (
  <img src={getSrc(country)} alt={""} />
));
Flag.displayName = "Flag";

interface IFlagContainerProps {
  categoryId: string;
}

const FlagContainer = memo<IFlagContainerProps>(({ categoryId }) => {
  const country = useParamSelector(categoryIconByIdSelector, [categoryId]);

  return (
    <Flag country={country} />
  );
});
FlagContainer.displayName = "FlagContainer";

export { Flag, FlagContainer };
