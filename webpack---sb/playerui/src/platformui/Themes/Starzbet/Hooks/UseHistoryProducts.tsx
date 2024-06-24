import { useMemo } from "react";
import {
  platformui_starzbet_bonus_products_games,
  platformui_starzbet_bonus_products_virtual,
  platformui_starzbet_footer_liveCasino,
  platformui_starzbet_history_title_account,
  platformui_starzbet_history_title_casino,
  platformui_starzbet_history_title_sports,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { isNotNil } from "@sb/utils";
import { IS_STARZBET_KG } from "../../../../ServerEnvironment";
import { EHistoryProduct } from "../../../Store/History/Model/EHistoryProduct";

const products = [
  IS_STARZBET_KG
    ? null
    : {
      id: EHistoryProduct.sports,
      name: platformui_starzbet_history_title_sports,
    },
  {
    id: EHistoryProduct.casino,
    name: platformui_starzbet_history_title_casino,
  },
  {
    id: EHistoryProduct.account,
    name: platformui_starzbet_history_title_account,
  },
  {
    id: EHistoryProduct.liveCasino,
    name: platformui_starzbet_footer_liveCasino,
  },
  {
    id: EHistoryProduct.games,
    name: platformui_starzbet_bonus_products_games,
  },
  {
    id: EHistoryProduct.virtual,
    name: platformui_starzbet_bonus_products_virtual,
  },
].filter(isNotNil);

const useHistoryProducts = () => {
  const [t] = useTranslation();

  return useMemo(
    () => products.map(({ id, name }) => ({
      id,
      name: t.plain(name),
    })).sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }

      if (a.name > b.name) {
        return 1;
      }

      return 0;
    }),
    [t],
  );
};

export { useHistoryProducts };
