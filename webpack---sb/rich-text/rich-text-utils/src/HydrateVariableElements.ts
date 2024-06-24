import { getNotNil } from "@sb/utils";

type TInfo = {
  variable: string;
  value: string | number;
};

function hydrateVariableElements(source: string, infos: TInfo[]): string;
function hydrateVariableElements(source: Element, infos: TInfo[]): void;

function hydrateVariableElements<
  Source extends string | Element,
  Return extends Source extends string ? string : void,
>(source: string | Element, infos: TInfo[]): Return {
  const fromString = typeof source === "string";

  let _source: Element;

  if (fromString) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(source.trim(), "text/html");

    _source = dom.body;
  } else {
    _source = source;
  }

  for (const span of _source.getElementsByTagName("span")) {
    const variable = span.dataset.variable;

    if (variable === undefined) {
      continue;
    }

    const info = getNotNil(infos.find((it) => it.variable === variable), ["hydrateVariableElements", variable], "Info by Variable");

    span.innerHTML = info.value.toString();
  }

  return (fromString ? _source.innerHTML : undefined) as Return;
}

export { hydrateVariableElements };
