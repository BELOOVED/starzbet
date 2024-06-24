const isHTML = (source: string): boolean => {
  try {
    const doc = new DOMParser().parseFromString(source, "text/html");

    return Array.from(doc.body.childNodes).some((it) => it.nodeType === 1);
  } catch {
    return false;
  }
};

export { isHTML };
