import { EProductCode } from "@sb/betting-core/EProductCode";
import { getSelectOptions } from "../../../../../common/Components/Field/SelectModel";
import { type TSelfProtectionBaseModel } from "../../Model/SelfProtectionModel";
import { ESelfProtectionInterval, NO_LIMIT, type TNoLimit } from "../../Model/SelfProtectionInterval";

const SELF_EXCLUSION_PRODUCT = [
  EProductCode.SPORTS,
  EProductCode.LIVE_CASINO,
  EProductCode.CASINO,
] satisfies EProductCode[];

const SELF_EXCLUSION_PRODUCT_OPTIONS = getSelectOptions(SELF_EXCLUSION_PRODUCT);

type TSelfExclusionProduct = typeof SELF_EXCLUSION_PRODUCT[number]

function assertsSelfExclusionProduct(product: EProductCode | null): asserts product is TSelfExclusionProduct {
  if (product && !SELF_EXCLUSION_PRODUCT.some((it) => it === product)) {
    throw new Error(`[assertsSelfExclusionProduct]: Unexpected product ${product}`);
  }
}

const SELF_EXCLUSION_PERIOD = [
  ESelfProtectionInterval.INDEFINITELY,
  ESelfProtectionInterval.MONTH_6,
  ESelfProtectionInterval.YEARS_1,
  ESelfProtectionInterval.YEARS_2,
  ESelfProtectionInterval.YEARS_5,
  NO_LIMIT,
] satisfies (TNoLimit | ESelfProtectionInterval)[];

type TSelfExclusionPeriod = typeof SELF_EXCLUSION_PERIOD[number]

const SELF_EXCLUSION_PERIOD_OPTIONS = getSelectOptions(SELF_EXCLUSION_PERIOD);

const SELF_EXCLUSION_FORM = "selfExclusion";

type TSelfExclusionFormModel = Omit<TSelfProtectionBaseModel, "period"> & {
  period: TSelfExclusionPeriod;
  product: TSelfExclusionProduct;
}

export type {
  TSelfExclusionFormModel,

  TSelfExclusionProduct,
};
export {
  SELF_EXCLUSION_FORM,

  SELF_EXCLUSION_PRODUCT_OPTIONS,
  assertsSelfExclusionProduct,
  SELF_EXCLUSION_PERIOD_OPTIONS,
};
