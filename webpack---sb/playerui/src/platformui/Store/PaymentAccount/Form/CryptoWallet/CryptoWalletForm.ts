import { createFormFieldPaths, field, type TFieldDefs, withValidation } from "@sb/form-new";
import { formRequiredValidation } from "../../../Form/Utils/FormValidations";
import { type TCryptoWalletFormModel } from "./CryptoWalletFormModel";

const CRYPTO_WALLET_FORM_FIELDS: TFieldDefs<keyof TCryptoWalletFormModel> = {
  walletAddress: field({ extensions: withValidation(formRequiredValidation()) }),
};

const CRYPTO_WALLET_FORM_FIELD_PATHS = createFormFieldPaths(CRYPTO_WALLET_FORM_FIELDS);

export {
  CRYPTO_WALLET_FORM_FIELDS,
  CRYPTO_WALLET_FORM_FIELD_PATHS,
};
