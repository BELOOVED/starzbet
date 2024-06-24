import { type IFormContext } from "../Components";

const withFormName = (formName: string): IFormContext => ({ formName });

export { withFormName };
