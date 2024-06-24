import clsx from "clsx";
import { type ComponentType, createElement, memo, useState } from "react";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_placeholder_select } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { isNotNil, type TNullable, withProps } from "@sb/utils";
import classes from "./FixFinFiatHavaleBankAccount.module.css";
import { EFixFinFiatBank, FIX_FIN_FIAT_BANK_NAME_TO_ID_MAP } from "../../../../Store/Banking/Models/FixFinFiatModel";
import { FixFinBankAccountContainer } from "../../../../Components/FixFinBankAccountContainer/FixFinBankAccountContainer";

const fixFinFiatIconMap: Record<EFixFinFiatBank, string | undefined> = {
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_FAST]: classes.fastBank,
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_AKBANK]: classes.akbank,
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_ALBARAKA]: classes.albaraka,
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_ALTERNATIF]: classes.alternatifBank,
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_DENIZBANK]: classes.denizbank,
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_FIBABANK]: classes.fibabank,
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_ING]: classes.ingBank,
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_PAPARA]: classes.paparaBank,
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_QNB]: classes.qnbBank,
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_SEKERBANK]: classes.sekerBank,
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_TEB]: classes.tebBank,
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_TURKEY]: classes.turkeyBank,
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_VAKIFBANK]: classes.vakifBank,
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_YAPIKREDI]: classes.yapiKrediBank,
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_HALBANK]: classes.halbank,
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_ZIRAAT]: classes.ziraatBank,
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_ANADOLUBANK]: classes.anadolubank,
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_ODEBANK]: classes.odeabank,
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_GARANTI]: classes.garantibank,
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_KUVEYT]: classes.kunveytturkbank,
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_ISBANKASI]: classes.isbankasi,
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_ZIRAAT_KATILIM]: classes.ziraatKatilim,
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_VAKIF_KATILIM]: classes.vakifKatilim,
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_ENPARA]: classes.enpara,
  [EFixFinFiatBank.FIX_FIN_FIAT_BANK_PTT]: classes.pttBank,
};

interface IFixFinBankIconProps extends Pick<IFixFinFiatHavaleBankAccountProps, "bank" | "logo"> {
  fixed?: boolean;
  className?: string;
}

const FixFinBankIcon = memo<IFixFinBankIconProps>(({
  bank,
  fixed,
  logo,
  className,
}) => {
  const [show, setShow] = useState(true);

  const onError = () => setShow(false);
  const bankName = FIX_FIN_FIAT_BANK_NAME_TO_ID_MAP[bank];

  return (
    <div className={clsx(classes.cardIcon, fixed && classes.fixedSize, className)}>
      {
        isNotNil(logo) && show
          ? (
            <img
              src={logo}
              alt={bank}
              loading={"lazy"}
              onError={onError}
            />
          )
          : <div className={clsx(bankName ? fixFinFiatIconMap[bankName] : classes.defaultIcon)} />
      }
    </div>
  );
});
FixFinBankIcon.displayName = "FixFinBankIcon";

interface IFixFinFiatHavaleBankAccountProps {
  bank: string;
  onClick: () => void;
  extra?: ComponentType;
  logo?: TNullable<string>;
}

const FixFinFiatHavaleBankAccount = memo<IFixFinFiatHavaleBankAccountProps>(({
  bank,
  onClick,
  extra,
  logo,
}) => {
  const [t] = useTranslation();

  return (
    <div className={classes.card} onClick={onClick}>
      <FixFinBankIcon logo={logo} bank={bank} fixed />

      <div className={classes.content}>
        <div className={classes.cardTitle}>
          {bank}
        </div>

        {isNotNil(extra) ? <div className={classes.description}>{createElement(extra)}</div> : null}
      </div>

      <div className={classes.selectButton}>
        {t(platformui_starzbet_placeholder_select)}
      </div>
    </div>
  );
});
FixFinFiatHavaleBankAccount.displayName = "FixFinFiatHavaleBankAccount";

const FixFinBankAccount = withProps(FixFinBankAccountContainer)({ component: FixFinFiatHavaleBankAccount });

export { FixFinFiatHavaleBankAccount, FixFinBankAccount, FixFinBankIcon };
