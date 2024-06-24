import { memo } from "react";
import { translateMarket, type TTranslateMarketArg } from "@sb/betting-core/TranslateEntity/TranslateMarket";
import { useTranslation } from "@sb/translator";

const BaseMarketName = memo<TTranslateMarketArg>((props) => {
  const [t] = useTranslation();

  return translateMarket(t, props);
});
BaseMarketName.displayName = "BaseMarketName";

export { BaseMarketName };
