import { memo, type ReactNode } from "react";
import classes from "./ThemedModalIcon.module.css";
import { WarningIcon } from "../../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/WarningIcon/WarningIcon";
import { ErrorIcon } from "../../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/ErrorIcon/ErrorIcon";
import { TickIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/TickIcon/TickIcon";
import { PartyHornIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/PartyHornIcon";
import { CrownIconV1 } from "../../Icons/CrownIcon/CrownIcon";

type TIconVariant = "warning" | "error" | "success" | "bonus" | "crown" | "party"

const variants: Record<TIconVariant, ReactNode> = {
  "warning": <WarningIcon height={60} width={60} color={"warning"} />,
  "error": <ErrorIcon height={60} width={60} color={"error"} />,
  "success": <TickIcon height={60} width={60} color={"validation"} />,
  "bonus": <PartyHornIcon height={60} width={60} className={classes.bonusIcon} />,
  "crown": <CrownIconV1 height={60} width={60} color={"blue"} />,
  "party": <PartyHornIcon height={60} width={60} color={"blue"} />,
};

type TThemedModalIconProps = {
  variant: TIconVariant;
}

const ThemedModalIcon = memo<TThemedModalIconProps>(
  ({ variant }) => (
    <div className={classes.modalIcon}>
      {variants[variant]}
    </div>

  ),
);
ThemedModalIcon.displayName = "ThemedModalIcon";

export { ThemedModalIcon };
export type { TIconVariant };
