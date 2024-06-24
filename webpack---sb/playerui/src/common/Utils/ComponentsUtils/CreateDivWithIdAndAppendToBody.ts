const createDivWithIdAndAppendToBody = (rootId: string) => {
  const div = document.createElement("div");
  div.setAttribute("id", rootId);
  document.body.appendChild(div);

  return div;
};

export { createDivWithIdAndAppendToBody };
