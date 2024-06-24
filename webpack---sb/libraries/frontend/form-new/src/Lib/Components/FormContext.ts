import { createContext } from "react";

interface IFormContext {
  formName: string;
}

const FormContext = createContext<IFormContext | null>(null);

export { FormContext };

export type { IFormContext };

