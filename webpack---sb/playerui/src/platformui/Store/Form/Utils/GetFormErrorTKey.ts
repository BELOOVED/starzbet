import type { IOptions } from "@sb/translator";

const getFormErrorTKey =
  (translateKey: string | undefined, options?: IOptions): readonly [translateKey: string, option: IOptions] => [translateKey || "", options || {}];

export { getFormErrorTKey };
