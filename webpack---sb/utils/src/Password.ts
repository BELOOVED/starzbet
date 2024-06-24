
const generateRandomString = () => {
  const length = 15;
  const string = "abcdefghijklmnopqrstuvwxyz";
  const numeric = "0123456789";
  const punctuation = "!?#%$";
  let password = "";
  let character = "";

  while (password.length < length) {
    const entity1 = Math.floor(string.length * Math.random() * Math.random());
    const entity2 = Math.floor(numeric.length * Math.random() * Math.random());
    const entity3 = Math.floor(punctuation.length * Math.random() * Math.random());

    let hold = string.charAt(entity1);

    hold = password.length % 2 === 0 ? hold.toUpperCase() : hold;

    character += hold;
    character += numeric.charAt(entity2);
    character += punctuation.charAt(entity3);
    password = character;
  }

  password = password.split("").sort(() => 0.5 - Math.random()).join("");

  return password.substr(0, length);
};


export const generatePassword = generateRandomString;

const validateMinPassword = (password: string) => password.length >= 8;

const validateMaxPassword = (password: string) => password.length <= 20;

const validateLowercase = (password: string) => /^(?=.*[a-z])/.test(password);

const validateUppercase = (password: string) => /^(?=.*[A-Z])/.test(password);

const validateAnyLetter = (password: string) => /^(?=.*[a-zA-Z])/.test(password);

const validateNumbers = (password: string) => /^(?=.*[0-9])/.test(password);

const validateSymbols = (password: string) => /^(?=.*[!?#%$])/.test(password);

export const passwordValidator = {
  validateMinPassword,
  validateMaxPassword,
  validateLowercase,
  validateUppercase,
  validateNumbers,
  validateSymbols,
  validateAnyLetter,
};
