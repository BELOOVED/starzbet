//todo copy paste from @funsclub-ui
const renderToTemplate = (key: string, fallback: Record<string, string> = {}) =>
  `%$ ${key} ${JSON.stringify(fallback)} $%`;

export { renderToTemplate };
