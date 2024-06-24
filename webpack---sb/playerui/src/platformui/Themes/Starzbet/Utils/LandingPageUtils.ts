import { useMemo } from "react";
import {} from "@sb/utils";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { gameManagerPages, type TGameManagerPage } from "../../../Store/Games/Model/Games";

const assertGamePage = (product: string): TGameManagerPage => {
  if (gameManagerPages.find((v) => product === v)) {
    return product as TGameManagerPage;
  }

  throw new Error(`Assert TGameManagerPage - ${product}`);
};

const useGetImageSize = (count: number) => useMemo(
  () => {
    if (IS_MOBILE_CLIENT_SIDE) {
      return 162;
    }

    if (count === 2) {
      return 180;
    }

    return 230;
  },
  [count],
);

const useCountShowGames = (count: number) => useMemo(
  () => {
    if (count === 2) {
      return 3;
    }

    return 5;
  },
  [count],
);

export {
  useGetImageSize,
  useCountShowGames,
  assertGamePage,
};
