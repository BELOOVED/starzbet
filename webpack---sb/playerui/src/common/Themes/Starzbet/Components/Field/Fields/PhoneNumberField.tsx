import { withProps } from "@sb/utils";
import { PhoneNumberFieldCreator } from "../../../../../Components/Field/PhoneNumberFieldCreator";
import { PhoneNumberInput } from "../../PhoneNumberInput/PhoneNumberInput";
import { Field } from "../Field";

const PhoneNumberField = withProps(PhoneNumberFieldCreator)({ ThemedField: Field, ThemedPhoneNumberInput: PhoneNumberInput });

export { PhoneNumberField };
