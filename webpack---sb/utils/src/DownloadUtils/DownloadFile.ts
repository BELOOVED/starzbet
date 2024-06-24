const downloadFile = (url: string, filename?: string): void => {
  const a = document.createElement("a");
  a.href = url;

  if(filename) {
    a.download = filename;
  }

  document.body.appendChild(a);
  a.click();
  a.remove();
};

export { downloadFile }
