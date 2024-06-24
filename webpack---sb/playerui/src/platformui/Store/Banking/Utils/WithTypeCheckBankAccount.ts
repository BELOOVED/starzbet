import { type ComponentType, createElement } from "react";
import { type TPlatformSystemBankAccountType } from "../PlatformBankingInitialState";

interface IWithTypeCheckBankAccountProps<Props extends TPlatformSystemBankAccountType = TPlatformSystemBankAccountType> {
  props: Props;
}

const isBankAccountTypeName = <T extends TPlatformSystemBankAccountType>(account: TPlatformSystemBankAccountType, typeName: TPlatformSystemBankAccountType["__typename"]): account is T => account.__typename !== typeName;

const withTypeCheckBankAccount = <Props extends TPlatformSystemBankAccountType>(
  component: ComponentType<Props>,
  typeName: TPlatformSystemBankAccountType["__typename"],
): ComponentType<IWithTypeCheckBankAccountProps> => ({
    props,
  }: IWithTypeCheckBankAccountProps) => {
    if (isBankAccountTypeName(props, typeName)) {
      throw new Error("Unexpected `bank account` data, fetch correct bank account on `payment method` page");
    }

    return createElement(component, props);
  };

export type { IWithTypeCheckBankAccountProps };
export { withTypeCheckBankAccount };
