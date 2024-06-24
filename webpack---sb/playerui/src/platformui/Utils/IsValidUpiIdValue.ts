/**
 *  Validates a UPI number
 *  @param   value  String     // UPI format `test@test`
 *  @return  Boolean: success/false // Returns if is valid
 */

const UPI_REGEX = /^[0-9A-Za-z.-]{2,256}@[A-Za-z]{2,64}$/;

const isValidUpiIdValue = (value: string): boolean => UPI_REGEX.test(value);

export { isValidUpiIdValue };
