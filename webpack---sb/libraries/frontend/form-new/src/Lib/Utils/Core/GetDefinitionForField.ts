import { isEmpty, isNil, isNumber } from "@sb/utils";
import { type IFormDef, type IWithFormsState, type TFieldDef, type TFieldPath } from "../../Types";
import { selectFieldValue, selectFormDef } from "../../Store";
import { isFieldDef, isFormDef, isListDef, isObjectFieldDef, isOneOfDef } from "../DefTypeCheckers";
import { KindService } from "../KindService";
import { ReducerError } from "../Asserts";

/**
 * Recursive function which following the path to the end and will return the correct field definition
 */
const getDefinitionForField = <
  State extends IWithFormsState = IWithFormsState,
  Def extends TFieldDef<State> = TFieldDef<State>
>(fieldPath: TFieldPath, formName: string, state: State): Def => {
  let currentDef: TFieldDef<State> = selectFormDef(state, formName) as IFormDef<State>;
  const fieldQueue = [...fieldPath];

  while (fieldQueue.length) {
    if (isFormDef(currentDef)) {
      let nextField = fieldQueue[0];
      nextField = isNil(nextField) ? nextField : KindService.getWithoutKind(nextField);

      if (isNil(nextField)) {
        throw ReducerError.typeError(fieldPath, "Invalid path");
      }

      const nextDef: TFieldDef<State> | undefined = currentDef.fields[nextField];

      if (isNil(nextDef)) {
        throw ReducerError.typeError(fieldPath, "Field does not exist in the form");
      }

      if (!isOneOfDef(nextDef)) {
        fieldQueue.shift();
      }

      currentDef = nextDef;
      continue;
    }

    if (isFieldDef((currentDef)) || isObjectFieldDef(currentDef)) {
      throw ReducerError.typeError(fieldPath, "Invalid path");
    }

    if (isListDef(currentDef)) {
      const nextField = fieldQueue[0];

      if (isNil(nextField)) {
        throw ReducerError.typeError(fieldPath, "Invalid path");
      }

      // TODO implement something better
      if (
        !isNumber(KindService.getWithoutKind(nextField)) &&
        !(/^\d+$/).exec(KindService.getWithoutKind(nextField).toString())
      ) {
        throw ReducerError.typeError(fieldPath, `Invalid path: in the array elem "${nextField}" should be a number`);
      }

      currentDef = currentDef.fields;

      if (!isOneOfDef(currentDef)) {
        fieldQueue.shift();
      }

      continue;
    }

    if (isOneOfDef(currentDef)) {
      const currentField = fieldQueue.shift();

      if (isNil(currentField)) {
        throw ReducerError.typeError(fieldPath, "Invalid path");
      }

      const currentFieldPath = fieldPath.slice(0, fieldPath.length - fieldQueue.length);
      const currentValue = selectFieldValue(state, formName, currentFieldPath);
      const typeResolver = currentDef.resolver;

      const kindOfDef = KindService.getKind(currentField) ?? typeResolver(currentValue, currentFieldPath, formName, state);

      if (isNil(kindOfDef)) {
        if (isEmpty(fieldQueue)) {
          continue;
        }

        throw ReducerError.typeError(fieldPath, `Cannot extract kind of definition from path for elem "${currentField}"`);
      }

      const selectedOneOfDef = currentDef.fields[kindOfDef];

      if (isNil(selectedOneOfDef)) {
        throw ReducerError.typeError(fieldPath, "Cannot extract definition from kind");
      }

      if (isOneOfDef(selectedOneOfDef)) {
        throw ReducerError.typeError(fieldPath, "OneOf field cannot exist inside another oneOf field");
      }

      currentDef = selectedOneOfDef;
      continue;
    }

    const type = (currentDef as Record<"type", string>).type;
    throw ReducerError.typeError(fieldPath, `Not supported definition type: "${type}"`);
  }

  // TODO^HY refactor, improve types and remove cast
  return currentDef as Def;
};

export { getDefinitionForField };
