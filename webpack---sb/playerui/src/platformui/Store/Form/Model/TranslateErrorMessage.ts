import { type IOptions } from "@sb/translator";

class TranslateErrorMessage {
  constructor(public translateKey: string, public options: IOptions) {}
}

export { TranslateErrorMessage };

