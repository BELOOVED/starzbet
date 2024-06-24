
const getTranslateTheme = () => {
  const theme = process.env.THEME;

  return theme === "sahabet2" ? "sahabet" : theme;
};

export { getTranslateTheme };

