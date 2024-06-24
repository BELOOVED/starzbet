import { type ComponentType, createElement, memo } from "react";
import type { TPlatform_FixFinBank_Fragment } from "@sb/graphql-client/PlayerUI";
import { type TNullable, useActionWithBind } from "@sb/utils";
import { platformBankAccountChangeAction } from "../../Store/Banking/BankingActions";

interface IFixFinBankAccountProps {
  bank: string;
  onClick: () => void;
  logo?: TNullable<string>;
}

interface IFixFinBankAccountContainerProps extends TPlatform_FixFinBank_Fragment {
  component: ComponentType<IFixFinBankAccountProps>;
}

// for TPlatform_FixFinBank_Fragment data with handle `platformBankAccountChangeAction`
const FixFinBankAccountContainer = memo<IFixFinBankAccountContainerProps>(({
  id,
  name,
  logo,
  banner,
  component,
}) => {
  const handleClick = useActionWithBind(platformBankAccountChangeAction, id);

  return createElement(
    component,
    {
      bank: name,
      onClick: handleClick,
      logo: banner ?? logo,
    },
  );
});
FixFinBankAccountContainer.displayName = "FixFinBankAccountContainer";

export { FixFinBankAccountContainer };
