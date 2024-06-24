import negate from "lodash/fp/negate";

enum EBetGroup {
  single = "single",
  multi = "multi",
  system = "system",
}

const isSingleBetGroup = (betGroup: EBetGroup) => betGroup === EBetGroup.single;

const notSingleBetGroup = negate(isSingleBetGroup);

export { EBetGroup, notSingleBetGroup };
