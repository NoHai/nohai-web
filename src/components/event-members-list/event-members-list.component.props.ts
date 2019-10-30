import { ParticipantModel } from '../../contracts/models/participant.model';

export interface EventMembersListProps {
  title: string;
  showModal: boolean;
  onClose: () => void;
}
