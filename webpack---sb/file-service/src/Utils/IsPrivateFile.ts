const isPrivateFile = (pathToFile: string) => pathToFile.startsWith("private/");

const isPublicFile = (pathToFile: string) => pathToFile.startsWith("public/");

const isTempFile = (pathToFile: string) => pathToFile.startsWith("temp/");

export { isPrivateFile, isPublicFile, isTempFile };
