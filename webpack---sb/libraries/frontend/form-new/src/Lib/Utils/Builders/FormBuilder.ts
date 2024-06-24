import { type TExplicitAny } from "@sb/utils";
import {
  type IFieldDef,
  type IFormDef,
  type IListDef,
  type IObjectFieldDef,
  type IOneOfDef,
  type TFieldDef,
  type TFieldDefs,
  type TResolver,
} from "../../Types";
import { EDefType } from "../../Model";
import { withHiddenField as hiddenField } from "./FieldBuilders";

type TExtensions = Record<string, TExplicitAny>

const formBuilder = {
  field: (
    def: Omit<IFieldDef, "type" | "extensions">,
    extensions: TExtensions = {},
  ): IFieldDef => ({ ...def, type: EDefType.field, extensions }),

  objectField: (
    def: Omit<IObjectFieldDef, "type" | "extensions">,
    extensions: TExtensions,
  ): IObjectFieldDef => ({ ...def, type: EDefType.objectField, extensions }),

  list: (
    fields: TFieldDef,
    extensions: TExtensions,
  ): IListDef => ({
    type: EDefType.list,
    fields,
    extensions,
  }),

  form: (
    fields: TFieldDefs,
    extensions: TExtensions,
    withHiddenField: boolean,
  ): IFormDef => ({
    type: EDefType.form,
    fields: withHiddenField ? { ...fields, ...hiddenField } : fields,
    extensions,
  }),

  oneOf: (
    fields: TFieldDefs,
    extensions: TExtensions,
    resolver: TResolver,
  ): IOneOfDef => ({
    type: EDefType.oneOf,
    fields,
    extensions,
    resolver,
  }),

};

export {
  formBuilder,
};
