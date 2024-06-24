
const strip = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");

  return doc.body.textContent || "";
};

const safeRequestPayload = <P extends object>(payload: P) => (
  Object.entries(payload).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: typeof value === "string" ? strip(value).trim() : value }),
    {} as P,
  )
);

export { safeRequestPayload };
