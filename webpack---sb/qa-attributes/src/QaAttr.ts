/**
 * Used for find elements on page in e2e playwright tests.
 */

type TQaAttr = Record<string, never> | { ["data-cy"]: string; }

const qaAttr = (attribute?: string): TQaAttr =>
  typeof attribute === "string" ? { ["data-cy"]: attribute } : {};

const joinQaAttr = (...attrs: (string | undefined)[]) => attrs.filter(Boolean).join("--");

const qaAttrSelector = (rootQaAttribute: string) => `[data-cy=${rootQaAttribute}]`;

const qaAttrsSelector = (...attrs: (string | undefined)[]) => `[data-cy=${attrs.filter(Boolean).join("--")}]`;

export {
  qaAttr,
  joinQaAttr,
  qaAttrSelector,
  qaAttrsSelector,
};
