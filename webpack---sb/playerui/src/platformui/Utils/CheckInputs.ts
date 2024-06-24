// @ts-nocheck
import {
  platformui_registration_checkInput_fieldIsRequired,
  platformui_validate_error_amountMultipleOf,
  platformui_validate_error_cpf,
} from "@sb/translates/platformui/CommonTKeys";
import { type IMoney, Money, type TNullable } from "@sb/utils";
import { isValidCPFValue } from "./IsValidCPFValue";

//TODO fix types
const checkForEmptiness = (value: unknown) => (value ? undefined : platformui_registration_checkInput_fieldIsRequired);

const checkMoneyMultipleOf = (value: number) => (amount: TNullable<IMoney>) => {
  if (amount && Money.toNumber(amount) % value !== 0) {
    return {
      tKey: platformui_validate_error_amountMultipleOf,
      options: { value },
    };
  }

  return undefined;
};

const checkCPFValue = (value: TNullable<string>, existValue?) => checkForEmptiness(value) ??
  (!isValidCPFValue(value) || existValue ? platformui_validate_error_cpf : undefined);

export {
  checkMoneyMultipleOf,
  checkCPFValue,
};
