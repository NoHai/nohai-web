import { ParticipantModel } from '../../contracts/models/participant.model';

export interface EventMembersProps {
  eventMembers: Array<ParticipantModel>;
  isOwner: boolean;
  onKickoutParticipant: (participantId: string) => void;
}
