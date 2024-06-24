import { isAnyObject } from "@sb/utils";
import {
  type IDef,
  type IFieldDef,
  type IFormDef,
  type IListDef,
  type IObjectFieldDef,
  type IOneOfDef,
  type IWithFormsState,
} from "../Types/";
import { EDefType } from "../Model";

function isDef(def: unknown): def is IDef {
  return isAnyObject(def) && "type" in def && "extensions" in def && isAnyObject(def.extensions);
}

function isAnyDef<State extends IWithFormsState>(
  def: unknown,
): def is IFieldDef | IObjectFieldDef | IFormDef<State> | IListDef<State> | IOneOfDef<State> {
  return isDef(def) && [isFieldDef, isObjectFieldDef, isFormDef, isListDef, isOneOfDef].some((fn) => fn(def));
}

function isFieldDef(def: IDef): def is IFieldDef {
  return def.type === EDefType.field;
}

function isObjectFieldDef(def: IDef): def is IObjectFieldDef {
  return def.type === EDefType.objectField;
}

function isFormDef<State extends IWithFormsState>(def: IDef): def is IFormDef<State> {
  return def.type === EDefType.form;
}

function isListDef<State extends IWithFormsState>(def: IDef): def is IListDef<State> {
  return def.type === EDefType.list;
}

function isOneOfDef<State extends IWithFormsState>(def: IDef): def is IOneOfDef<State> {
  return def.type === EDefType.oneOf;
}

export {
  isDef,
  isAnyDef,
  isFieldDef,
  isObjectFieldDef,
  isFormDef,
  isListDef,
  isOneOfDef,
};
