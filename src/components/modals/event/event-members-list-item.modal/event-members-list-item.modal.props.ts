import { ParticipantModel } from '../../../../contracts/models/participant.model';

export interface EventMembersListItemModalProps {
  member: ParticipantModel;
  isOwner: boolean;
  onKickoutParticipant:(participantId: string) => void;
}
