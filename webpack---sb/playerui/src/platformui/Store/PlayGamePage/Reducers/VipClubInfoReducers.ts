import { getNotNil, isEmpty, isNil, type TReducer } from "@sb/utils";
import { EPlatform_VipClubLeaderBoardPeriod } from "@sb/graphql-client";
import {
  type neighboursVipClubReceiveAction,
  type neighboursVipClubUpdateAction,
  type pinVipClubInfoAction,
  type pinVipClubInfoUpdateAction,
  type selfAndNeighboursVipClubUpdateAction,
  type selfVipClubPlacesReceiveAction,
  type selfVipClubUpdateAction,
  type setVipClubInfoPeriodAction,
  type setVipClubInfoTypeAction,
} from "../Actions/VipClubInfoActions";
import { DEFAULT_PIN, type EVipClubBoardType, type IVipClubInfoPin, type TWithPlayGameState } from "../PlayGameState";

const setVipClubInfoPeriodReducer: TReducer<TWithPlayGameState, typeof setVipClubInfoPeriodAction> = (
  state,
  { payload: { period } },
) => ({
  ...state,
  playGameNew: {
    ...state.playGameNew,
    vipClubInfo: {
      ...state.playGameNew.vipClubInfo,
      period,
    },
  },
});

const setVipClubInfoTypeReducer: TReducer<TWithPlayGameState, typeof setVipClubInfoTypeAction> = (
  state,
  { payload: { type } },
) => ({
  ...state,
  playGameNew: {
    ...state.playGameNew,
    vipClubInfo: {
      ...state.playGameNew.vipClubInfo,
      type,
    },
  },
});

const isEqualPin = (pin: IVipClubInfoPin, type: EVipClubBoardType, period: EPlatform_VipClubLeaderBoardPeriod | null) =>
  pin.type === type && pin.period === period;

const pinVipClubInfoReducer: TReducer<TWithPlayGameState, typeof pinVipClubInfoAction> = (
  state,
) => {
  const condition = isNil(state.playGameNew.vipClubInfo.pin) ||
    !isEqualPin(state.playGameNew.vipClubInfo.pin, state.playGameNew.vipClubInfo.type, state.playGameNew.vipClubInfo.period);

  return ({
    ...state,
    playGameNew: {
      ...state.playGameNew,
      vipClubInfo: {
        ...state.playGameNew.vipClubInfo,
        period: condition ? state.playGameNew.vipClubInfo.period : EPlatform_VipClubLeaderBoardPeriod.daily,
        pin: condition
          ? {
            period: getNotNil(state.playGameNew.vipClubInfo.period, ["pinVipClubInfoReducer"], "period"),
            type: state.playGameNew.vipClubInfo.type,
            place: state.playGameNew.vipClubInfo.self.place,
          }
          : DEFAULT_PIN,
      },
    },
  });
};

const pinVipClubInfoUpdateReducer: TReducer<TWithPlayGameState, typeof pinVipClubInfoUpdateAction> = (
  state,
  { payload: { place } },
) => ({
  ...state,
  playGameNew: {
    ...state.playGameNew,
    vipClubInfo: {
      ...state.playGameNew.vipClubInfo,
      pin: {
        ...state.playGameNew.vipClubInfo.pin,
        place,
      },
    },
  },
});

const notNilNumber = (num: number | undefined) => getNotNil(num, ["selfVipClubPlacesReceiveReducer"], "Place");

const selfVipClubPlacesReceiveReducer: TReducer<TWithPlayGameState, typeof selfVipClubPlacesReceiveAction> = (
  state,
  { payload },
) => {
  const filteredArr = payload.filter(({ place }) => place?.place);

  if (isEmpty(filteredArr)) {
    return ({
      ...state,
      playGameNew: {
        ...state.playGameNew,
        vipClubInfo: {
          ...state.playGameNew.vipClubInfo,
          period: EPlatform_VipClubLeaderBoardPeriod.daily,
        },
      },
    });
  }

  filteredArr.sort((a, b) =>
    notNilNumber(a.place?.place) - notNilNumber(b.place?.place));

  const topPlace = getNotNil(filteredArr[0], ["selfVipClubPlacesReceiveReducer"], "Top Place");

  return ({
    ...state,
    playGameNew: {
      ...state.playGameNew,
      vipClubInfo: {
        ...state.playGameNew.vipClubInfo,
        period: topPlace.period,
        self: {
          ...state.playGameNew.vipClubInfo.self,
          place: notNilNumber(topPlace.place?.place),
        },
        pin: {
          ...state.playGameNew.vipClubInfo.pin,
          period: topPlace.period,
          place: notNilNumber(topPlace.place?.place),
        },
      },
    },
  });
};

const neighboursVipClubReceiveReducer: TReducer<TWithPlayGameState, typeof neighboursVipClubReceiveAction> = (
  state,
  { payload },
) => {
  if (!payload) {
    return ({
      ...state,
      playGameNew: {
        ...state.playGameNew,
        vipClubInfo: {
          ...state.playGameNew.vipClubInfo,
          self: {
            place: null,
            points: null,
          },
          neighbours: null,
        },
      },
    });
  }

  const diff = state.playGameNew.vipClubInfo.diff;

  const isEqualPeriod = state.playGameNew.vipClubInfo.period === state.playGameNew.vipClubInfo.pin.period;

  const pin = isEqualPeriod
    ? {
      ...state.playGameNew.vipClubInfo.pin,
      place: payload.self.place,
    }
    : state.playGameNew.vipClubInfo.pin;

  if (!diff) {
    return ({
      ...state,
      playGameNew: {
        ...state.playGameNew,
        vipClubInfo: {
          ...state.playGameNew.vipClubInfo,
          self: {
            place: payload.self.place,
            points: payload.self.points,
          },
          neighbours: {
            before: payload.before,
            after: payload.after,
          },
          pin,
        },
      },
    });
  }

  const newBeforeData = diff.before ?? payload.before;
  const newAfterData = diff.after ?? payload.after;
  const newSelfPlace = diff.selfInfo?.place ?? payload.self.place;
  const newSelfPoints = diff.selfInfo?.points ?? payload.self.points;

  return ({
    ...state,
    playGameNew: {
      ...state.playGameNew,
      vipClubInfo: {
        ...state.playGameNew.vipClubInfo,
        self: {
          place: newSelfPlace,
          points: newSelfPoints,
        },
        neighbours: {
          before: newBeforeData,
          after: newAfterData,
        },
        diff: null,
        pin,
      },
    },
  });
};

const selfVipClubUpdateReducer: TReducer<TWithPlayGameState, typeof selfVipClubUpdateAction> = (
  state,
  { payload: { place, points } },
) => ({
  ...state,
  playGameNew: {
    ...state.playGameNew,
    vipClubInfo: {
      ...state.playGameNew.vipClubInfo,
      self: {
        place,
        points,
      },
    },
  },
});

const neighboursVipClubUpdateReducer: TReducer<TWithPlayGameState, typeof neighboursVipClubUpdateAction> = (
  state,
  { payload },
) => ({
  ...state,
  playGameNew: {
    ...state.playGameNew,
    vipClubInfo: {
      ...state.playGameNew.vipClubInfo,
      neighbours: {
        after: payload.after ?? state.playGameNew.vipClubInfo.neighbours?.after,
        before: payload.before ?? state.playGameNew.vipClubInfo.neighbours?.before,
      },
    },
  },
});

const selfAndNeighboursVipClubUpdateReducer: TReducer<TWithPlayGameState, typeof selfAndNeighboursVipClubUpdateAction> = (
  state,
  { payload: { self, neighbours } },
) => ({
  ...state,
  playGameNew: {
    ...state.playGameNew,
    vipClubInfo: {
      ...state.playGameNew.vipClubInfo,
      self,
      neighbours: {
        after: neighbours.after ?? state.playGameNew.vipClubInfo.neighbours?.after,
        before: neighbours.before ?? state.playGameNew.vipClubInfo.neighbours?.before,
      },
    },
  },
});

export {
  pinVipClubInfoReducer,
  setVipClubInfoTypeReducer,
  setVipClubInfoPeriodReducer,
  selfVipClubPlacesReceiveReducer,
  neighboursVipClubReceiveReducer,
  pinVipClubInfoUpdateReducer,
  selfVipClubUpdateReducer,
  neighboursVipClubUpdateReducer,
  selfAndNeighboursVipClubUpdateReducer,
};
