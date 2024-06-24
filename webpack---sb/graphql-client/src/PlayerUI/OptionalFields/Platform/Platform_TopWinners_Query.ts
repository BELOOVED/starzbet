import { type TPlatform_TopWinners_QueryOptionalFields } from "../../Generated/Services/Platform/Types/TPlatform_TopWinners_QueryOptionalFields";
import { platformPlayerQueryOptionalFieldsWithLogin } from "./Platform_Player_Query";

const platformTopWinnersQueryOptionalFields: TPlatform_TopWinners_QueryOptionalFields = {
  platformGameTopWinner: {
    player: platformPlayerQueryOptionalFieldsWithLogin,
  },
};

export { platformTopWinnersQueryOptionalFields };
