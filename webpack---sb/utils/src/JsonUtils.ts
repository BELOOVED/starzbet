/**
 * Download in browser received object as formatted json file.
 *
 * @param obj object
 * @param filename string
 *
 * @throws Error
 */
const downloadObjectAsJSON = (obj: object, filename: string = "filename") => {
  if (obj === undefined || obj === null || typeof obj !== "object") {
    throw new Error("Data not provided. Expected JS object.");
  }

  const a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob(
      [JSON.stringify(obj, null, 4)],
      {
        type: `text/json`,
      },
    ),
  );
  a.download = `${filename}.json`;
  a.click();
};


// @ts-ignore FIXME @strong-ts
const JSONParse = <O>(...args: Parameters<typeof JSON.parse>): O => JSON.parse(...args);

export { downloadObjectAsJSON, JSONParse };

