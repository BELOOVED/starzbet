import { type IBuilder, type TFieldDef, type TFieldDefs, type TResolver } from "../../Types";
import { _HIDDEN_FIELD_ } from "../../Model";
import { formBuilder } from "./FormBuilder";

interface IFieldBuilder extends IBuilder {
  multi?: boolean;
}

interface IFormBuilder extends IBuilder {
  fields: TFieldDefs;
  withHiddenField?: boolean;
}

interface IListBuilder extends IBuilder {
  fields: TFieldDef;
}

interface IOneOfBuilder extends IBuilder {
  fields: TFieldDefs;
  resolver: TResolver;
}

const field = ({ extensions = {}, multi = false }: IFieldBuilder = {}) => formBuilder.field(
  { multi },
  extensions,
);

const objectField = ({ extensions = {}, multi = false }: IFieldBuilder = {}) => formBuilder.objectField(
  { multi },
  extensions,
);

const form = ({ fields, extensions = {}, withHiddenField = false }: IFormBuilder) => formBuilder.form(
  fields,
  extensions,
  withHiddenField,
);

const list = ({ fields, extensions = {} }: IListBuilder) => formBuilder.list(
  fields,
  extensions,
);

const oneOf = ({ fields, extensions = {}, resolver }: IOneOfBuilder) => formBuilder.oneOf(
  fields,
  extensions,
  resolver,
);

const withHiddenField = { [_HIDDEN_FIELD_]: field() };

export {
  field,
  objectField,
  form,
  list,
  oneOf,
  withHiddenField,
};
