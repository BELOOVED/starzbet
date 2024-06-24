// @ts-nocheck
const handleImageOpen = (image, name= "") => {
  const win = window.open();

  win.document.write(`<img src=${image} style="border:0; top:0; left:0; bottom:0; right:0; width:100%;"/>`);

  win.document.title = name;
};

export { handleImageOpen };
