interface ISelectedMap {
  [index: string]: string[];
}

interface IWithLiveState {
  live: {
    favorites: string[];
    sportId: null | string;
    closableSportIds: string[];
    closableTournamentIds: string[];
    multiView: {
      [index: string]: {
        showed: boolean;
      };
    };
    dockedEvents: string[];
    collapsedDockedEvents: string[];
    selectedMap: ISelectedMap;
    pinnedEvents: string[];
    swappableEventId: null | string;
    insertableEventId: null | string;
    moveDockedEvent: boolean;
    onlyWidget: boolean;
    onlyVideo: boolean;
    streamingTab: null | string;
    videoId: null | number | string;
  };
}

const liveState: IWithLiveState = {
  live: {
    favorites: [],
    sportId: null,
    closableSportIds: [],
    closableTournamentIds: [],
    multiView: {},
    dockedEvents: [],
    collapsedDockedEvents: [],
    selectedMap: {},
    pinnedEvents: [],
    swappableEventId: null,
    insertableEventId: null,
    moveDockedEvent: false,
    onlyWidget: false,
    onlyVideo: false,
    streamingTab: null,
    videoId: null,
  },
};

export { liveState, type IWithLiveState, type ISelectedMap };
