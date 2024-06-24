import { type TExplicitAny } from "@sb/utils";
import { type EFormTypes } from "./Model/EFormTypes";

interface IWithFormState {
  form: Partial<Record<EFormTypes, { error: TExplicitAny; validate: TExplicitAny; }>>;
}

const formInitialState: IWithFormState = {
  form: {},
};

export { formInitialState };
