import { isNil } from "@sb/utils";

const extractTextFromSpans = (htmlString: string) => {
  const container = document.createElement("div");
  container.innerHTML = htmlString;

  const spanElements = container.getElementsByTagName("span");

  return Array.from(spanElements).reduce<string[]>(
    (acc, value) => {
      const text = value.textContent;

      if (isNil(text)) {
        return acc;
      }

      acc.push(text.trim());

      return acc;
    },
    [],
  ).join(" ");
};

export { extractTextFromSpans };
