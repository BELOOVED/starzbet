import { withProps } from "@sb/utils";
import { TextareaFieldCreator } from "../../../../../Components/Field/TextareaFieldCreator";
import { FormNewTextareaWrapper } from "../../Textarea/Textarea";
import { Field } from "../Field";

const TextareaField = withProps(TextareaFieldCreator)({ ThemedField: Field, ThemedTextarea: FormNewTextareaWrapper });

export { TextareaField };
