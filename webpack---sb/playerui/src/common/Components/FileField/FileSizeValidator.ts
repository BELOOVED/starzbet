const fileSizeValidator = (files: FileList, size: number) => {
  for (const file of files) {
    if (file.size > size) {
      return false;
    }
  }

  return true;
};

export { fileSizeValidator };
