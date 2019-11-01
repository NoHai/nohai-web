import { ParticipantModel } from '../../../../contracts/models/participant.model';

export interface EventMembersListModalProps {
  showModal: boolean;
  isOwner: boolean;
  members: Array<ParticipantModel>;
  onKickoutParticipant:(participantId: string) => void;
  onClose: () => void;
}