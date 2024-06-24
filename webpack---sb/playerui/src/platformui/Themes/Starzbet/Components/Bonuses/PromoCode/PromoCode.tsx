import clsx from "clsx";
import { type ChangeEvent, type KeyboardEvent, memo, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_bonus_promoCode_applyButton,
  platformui_starzbet_bonus_promoCode_placeholder,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { EKeyCodes, isEmpty, useAction } from "@sb/utils";
import classes from "./PromoCode.module.css";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { Space } from "../../../../../../common/Components/Space/Space";
import { Input } from "../../../../../../common/Themes/Starzbet/Components/Input/Input";
import { claimBonusByPromoCodeAction } from "../../../../../Store/Bonuses/BonusesActions";
import { claimBonusByPromoCodeLoadingSelector } from "../../../../../Store/Bonuses/Selectors/BonusCallManagerSelectors";

const PromoCode = memo<IWithClassName>(({ className }) => {
  const [t] = useTranslation();

  const claimBonusByPromoCode = useAction(claimBonusByPromoCodeAction);

  const claiming = useSelector(claimBonusByPromoCodeLoadingSelector);

  const [value, setValue] = useState("");

  const handleApply = () => {
    if (value.length > 0) {
      claimBonusByPromoCode(value);
      setValue("");
    }
  };

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === EKeyCodes.enter && document.activeElement === e.currentTarget) {
      handleApply();
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Space value={8} className={clsx(classes.promoContainer, className)}>
      <Input
        value={value}
        placeholder={t.plain(platformui_starzbet_bonus_promoCode_placeholder)}
        onChange={onChange}
        onKeyUp={onKeyUp}
        className={classes.input}
      />

      <Button
        colorScheme={"orange-gradient"}
        onClick={handleApply}
        className={classes.applyButton}
        disabled={claiming || isEmpty(value)}
      >
        {t(platformui_starzbet_bonus_promoCode_applyButton)}
      </Button>
    </Space>
  );
});
PromoCode.displayName = "PromoCode";

export { PromoCode };
