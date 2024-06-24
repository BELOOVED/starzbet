/**
 *  Validates a CPF number
 *  @param   value:  String     // User CPF (just numbers or formated(000.000.000-00))
 *  @return  Boolean: success/false // Returns if is valid
 *  Reference and logic: https://www.devmedia.com.br/validar-cpf-com-javascript/23916
 *  Official code: http://www.receita.fazenda.gov.br/aplicacoes/atcta/cpf/funcoes.js
 */

const isValidCPFValue = (value: string): boolean => {
  // Checking cpf length
  if (value.length !== 14 && value.length !== 11) {
    return false;
  }

  let formattedValue = value;

  // Checking for "formatted cpf (000.000.000-00)" and replace "points"
  if (formattedValue.length === 14) {
    formattedValue = formattedValue.replaceAll(/[.-]/g, "");
  }

  // Variables to check cpf valid (sum and rest)
  let sum = 0, rest = 0;

  // Checking for "null" CPF
  if (formattedValue === "00000000000") {
    return false;
  }

  // sum numbers
  for (let i = 1; i <= 9; ++i) {
    sum += (parseInt(formattedValue.substring(i - 1, i)) * (11 - i));
  }

  // Getting rest
  rest = (sum * 10) % 11;

  if ((rest == 10) || (rest == 11)) {
    rest = 0;
  }

  return rest === parseInt(formattedValue.substring(9, 10));
};

export { isValidCPFValue };
