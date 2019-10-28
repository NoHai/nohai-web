import { ParticipantModel } from '../../contracts/models/participant.model';

export interface EventMembersListProps {
  showModal: boolean;
  eventMembers: Array<ParticipantModel>;
  onButtonClick: () => void;
}
