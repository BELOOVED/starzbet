import { keys } from "@sb/utils/Keys";
import { getSelectOptions, type ISelectOption } from "../../../../common/Components/Field/SelectModel";

const payRetailersAccountTypeModel = {
  "0001": "Poupança",
  "0002": "Conta Corrente",
} as const;

type TPayRetailersAccountType = keyof typeof payRetailersAccountTypeModel

const payRetailersAccountTypeOptions =
  getSelectOptions(keys(payRetailersAccountTypeModel));

const payRetailersAccountTypeOption = (option: ISelectOption<TPayRetailersAccountType>) =>
  payRetailersAccountTypeModel[option.value];

export type { TPayRetailersAccountType };
export { payRetailersAccountTypeOptions, payRetailersAccountTypeOption };
