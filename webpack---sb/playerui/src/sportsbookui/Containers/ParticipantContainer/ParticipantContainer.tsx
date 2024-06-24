// @ts-nocheck
import type { FC, ReactNode } from "react";
import { useParamSelector } from "@sb/utils";
import { sportCodeToIdMap } from "@sb/betting-core/SportsMapUtils";
import { ESportCode } from "@sb/betting-core/ESportCode";
import { eventByIdNotNilSelector, eventByIdSelector } from "../../Store/Feed/Selectors/FeedSelectors";
import { isServer } from "../../Store/Feed/Model/Event";

const CurrentServer = ({ eventId, children }) => {
  const { extraInfo } = useParamSelector(eventByIdSelector, [eventId]);

  return (
    children(extraInfo?.currentServer)
  );
};
CurrentServer.displayName = "CurrentServer";

interface INotNilCurrentServerProps {
  eventId: string;
  participantShortId: string;
  children: (isServer: boolean) => ReactNode;
}

const servedSports = [
  sportCodeToIdMap[ESportCode.tennis],
  sportCodeToIdMap[ESportCode.badminton],
  sportCodeToIdMap[ESportCode.snooker],
  sportCodeToIdMap[ESportCode.table_tennis],
];

const withService = (sportId: string) => servedSports.includes(sportId);

const NotNilCurrentServer: FC<INotNilCurrentServerProps> = ({ eventId, participantShortId, children }) => {
  const { sportId, extraInfo } = useParamSelector(eventByIdNotNilSelector, [eventId, ["NotNilCurrentServer"]]);
  const isCurrentServer = withService(sportId) && isServer(participantShortId, extraInfo.currentServer);

  return (
    children(isCurrentServer)
  );
};
NotNilCurrentServer.displayName = "NotNilCurrentServer";

const ParticipantContainer = ({ eventId, children }) => {
  const { participants, extraInfo } = useParamSelector(eventByIdSelector, [eventId]);

  return (
    children(participants, extraInfo?.currentServer)
  );
};
ParticipantContainer.displayName = "ParticipantContainer";

export { CurrentServer, NotNilCurrentServer, ParticipantContainer };
