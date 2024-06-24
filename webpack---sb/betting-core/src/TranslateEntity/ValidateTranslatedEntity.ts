import { ReactNode } from "react";
import { isDev } from "@sb/utils";
import { Logger } from "../Utils/Logger";

const validateTranslatedEntity = <V extends ReactNode>(value: V) => {
  if (typeof value !== "string") {
    return value;
  }

  if (!value.includes("{{")) {
    return value;
  }

  const error = new Error(`Some values was not provided: ${value}`);

  if (isDev) {
    throw error;
  }

  Logger.error.app("validateTranslatedEntity", error.message);

  return value;
};

export { validateTranslatedEntity }
