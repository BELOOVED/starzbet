import { createSelector } from "reselect";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { categoriesSelector, eventsSelector } from "../../../Feed/Selectors/FeedSelectors";
import { EVirtualCategorySlug } from "../Model/CategorySlugWithLeague";

const videoBySportId = {
  [sportCodeToIdMap[ESportCode.kiron_horse_racing]]: "https://kiron.streamamg.com/324/horses-jiurexacaedaichaij6l.html",
  [sportCodeToIdMap[ESportCode.kiron_hounds_racing]]: "https://kiron.streamamg.com/324/dogs-fa7eich1foachaith7ie.html",
  [sportCodeToIdMap[ESportCode.kiron_motor_racing]]: "https://kiron.streamamg.com/324/motor-teiboh6mae6cheechiec.html",
  [sportCodeToIdMap[ESportCode.kiron_table_tennis]]: "https://kiron.streamamg.com/324/tabletennis-feifutae9ahf0aifahco.html",
  [sportCodeToIdMap[ESportCode.kiron_racing_roulette]]: "https://st7.net4media.net:8082/racing-roulette/75858bf5-16a1-486a-b42f-5349228d9935/playlist.m3u8",
  [sportCodeToIdMap[ESportCode.kiron_steeple_chase]]: "https://kiron.streamamg.com/324/steeple-chase-eezoh1seir8leifoh2du.html",
  [sportCodeToIdMap[ESportCode.kiron_keno]]: "https://st10.net4media.net:8082/keno/7b104b84-5782-4ec8-9aaa-8e6d06c7e4ac/playlist.m3u8",
  [sportCodeToIdMap[ESportCode.kiron_harness_racing]]: "https://st7.net4media.net:8082/harness-racing/e4aa904f-b70b-44e5-bbd8-992e88002bcd/playlist.m3u8",
  [sportCodeToIdMap[ESportCode.kiron_roulette]]: "https://st3.net4media.net:8082/SpinAndWin-HLS/324/playlist.m3u8",
  [sportCodeToIdMap[ESportCode.kiron_ice_hockey]]: "https://st3.net4media.net:8082/Hockey-HLS/324/playlist.m3u8",
  [sportCodeToIdMap[ESportCode.kiron_lucky_loot]]: "https://st3.net4media.net:8082/LuckyLoot-HLS/324/playlist.m3u8",
  [sportCodeToIdMap[ESportCode.kiron_cricket]]: "https://st8.net4media.net:8082/HK-Jubilee-Cricket/28d9c2d6-58ea-4737-8f09-420d630a28ba/playlist.m3u8",
};

const videoByCategorySlug = {
  [EVirtualCategorySlug["english-football"]]: "https://kiron.streamamg.com/324/fast-league-single-oopaid1faesh4aangu4n.html",
  [EVirtualCategorySlug["english-league"]]: "https://kiron.streamamg.com/324/fast-league-xahb0foa0ohghorei1ei.html",
  [EVirtualCategorySlug["spanish-football"]]: "https://kiron.streamamg.com/324/la-liga-chei7aihoo2fiel6sha2.html",
  [EVirtualCategorySlug["spanish-league"]]: "https://kiron.streamamg.com/324/spanish-goal-pievoj8rahyoomaehein.html",
  [EVirtualCategorySlug["italian-football"]]: "https://kiron.streamamg.com/324/serie-a-neoj4chohghie0aecaid.html",
  [EVirtualCategorySlug["italian-league"]]: "https://kiron.streamamg.com/324/italian-goal-legueco1ief1shae4joo.html",
  [EVirtualCategorySlug["euro-football"]]: "https://st3.net4media.net:8082/EuroLeague-HLS/324/playlist.m3u8",
  [EVirtualCategorySlug["world-cup-football"]]: "https://st3.net4media.net:8082/FTV-HLS/324/playlist.m3u8",
};

const virtualVideoUrlByParamsSelector = (params) => createSelector(
  eventsSelector,
  categoriesSelector,
  (events, categories) => {
    if (params == null) {
      return null;
    }

    if (params.sportId) {
      return videoBySportId[params.sportId] ? videoBySportId[params.sportId] : null;
    }

    if (params.categoryId) {
      const category = categories[params.categoryId];

      if (!category) {
        return null;
      }

      if (videoByCategorySlug[category.slug]) {
        return videoByCategorySlug[category.slug];
      }

      if (videoBySportId[category.sportId]) {
        return videoBySportId[category.sportId];
      }
    }

    return null;
  },
);

const visionXFeedIdentifier = {
  [EVirtualCategorySlug["english-football"]]: "e1eb5264-4950-4bd0-b3b7-4d11ef285aca",
  [EVirtualCategorySlug["english-league"]]: "55823ded-057a-474d-8b91-64a180a5ce74",
  [EVirtualCategorySlug["spanish-football"]]: "cae59523-0ce3-437b-bfa1-090925983804",
  [EVirtualCategorySlug["spanish-league"]]: "c7618512-c503-4a2c-b31d-9a53394512a3",
  [EVirtualCategorySlug["italian-football"]]: "f92a2a1e-b77b-4c75-b433-48cf80b4be02",
  [EVirtualCategorySlug["italian-league"]]: "3c6f7edb-d2ea-4a44-98c3-4d160a09e877",
  [EVirtualCategorySlug["euro-football"]]: "2889d4f8-3658-4f9c-84f6-294654db6365",
  [EVirtualCategorySlug["turkish-football"]]: "2914ae57-4c73-4b84-a8b4-c56a7b46e696",
};

const virtualXVisionUrlByParamsSelector = (params) => createSelector(
  eventsSelector,
  categoriesSelector,
  (events, categories) => {
    if (params == null) {
      return null;
    }

    if (params.categoryId) {
      const category = categories[params.categoryId];

      if (!category) {
        return null;
      }

      if (visionXFeedIdentifier[category.slug]) {
        return visionXFeedIdentifier[category.slug];
      }
    }

    return null;
  },
);

export { virtualVideoUrlByParamsSelector, virtualXVisionUrlByParamsSelector };
