import { withProps } from "@sb/utils";
import { TextFieldCreator } from "../../../../../Components/Field/TextFieldCreator";
import { Input } from "../../Input/Input";
import { Field } from "../Field";

const TextField = withProps(TextFieldCreator)({ ThemedField: Field, ThemedInput: Input });

export { TextField };

