
export interface EventMembersListItemModalProps {
  eventId: string;
  member: any;
  isOwner: boolean;
  isEventStartedOrPased: boolean;
  onKickoutParticipant:(participantId: string) => void;
}
