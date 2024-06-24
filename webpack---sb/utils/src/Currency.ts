/**
 * It just namespace as Math
 */
import { ECurrencyCode } from "./ECurrencyCode";
import { ECurrencySymbol } from "./ECurrencySymbol";

export class Currency {
  /**
   * @deprecated Use ECurrencyCode instead
   */
  static CODES = ECurrencyCode;

  /**
   * @deprecated Use ECurrencySymbol instead
   */
  static SYMBOLS = ECurrencySymbol;

  static isSupported(currency: string): boolean {
    return (
      Currency.CODES.hasOwnProperty(currency) &&
      Currency.SYMBOLS.hasOwnProperty(currency)
    );
  }

  private constructor() {
  }
}
