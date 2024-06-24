import { memo } from "react";
import {
  RedirectLocalized,
} from "../../../../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import { type IWithGamePage, systemLabels } from "../../../../../Store/Games/Model/Games";
import { labelPathByGamePageMap } from "../../../../../Utils/GetGamesViewParams";

const params = { labelId: systemLabels.all };

const GamesRedirect = memo<IWithGamePage>(({ page }) =>
  <RedirectLocalized to={labelPathByGamePageMap[page]} params={params} />);
GamesRedirect.displayName = "GamesRedirect";

export { GamesRedirect };
