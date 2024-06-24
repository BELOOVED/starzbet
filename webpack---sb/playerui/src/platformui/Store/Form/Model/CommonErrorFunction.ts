// @ts-nocheck
import { errorMessages } from "./ErrorMessages";

const commonErrorFunction = (formType) => (error) => {
  if (error) {
    if (!errorMessages[formType]) {
      return {
        error: "Unexpected error",
      };
    }

    return {
      error: errorMessages[formType][error.code] || "Unexpected error",
    };
  }

  return undefined;
};

export { commonErrorFunction };
