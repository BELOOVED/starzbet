interface IWithTranslates {
  translate: Record<string, string>;
}

const translateState = {
  translate: {},
};

export { translateState, type IWithTranslates };
