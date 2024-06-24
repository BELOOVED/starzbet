import { createPropertySelectors } from "@sb/utils";
import { type IWithVipClubState } from "../VipClubInitialState";

const vipClubSelectors = createPropertySelectors(({ vipClub }: IWithVipClubState) => vipClub);

export { vipClubSelectors };
