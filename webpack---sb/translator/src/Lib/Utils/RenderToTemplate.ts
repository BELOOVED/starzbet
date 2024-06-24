import { omit } from "@sb/utils";
import { type IOptions } from "../Model/IOptions";

const renderToTemplate = (key: string, fallback: Record<string, string>, options?: IOptions) => {
  const params = options !== undefined
    ? omit(
      ["context", "fallback", "skipTemplateRendering", "transform"],
      options,
    )
    : {};

  return `%% ${key} ${JSON.stringify(params)} #${JSON.stringify(fallback)}# %%`;
};

export { renderToTemplate };
