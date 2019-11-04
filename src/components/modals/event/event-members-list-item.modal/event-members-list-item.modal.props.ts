
export interface EventMembersListItemModalProps {
  eventId: string;
  member: any;
  isOwner: boolean;
  onKickoutParticipant:(participantId: string) => void;
}
