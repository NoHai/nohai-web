import { ParticipantModel } from "../../../../contracts/models/participant.model";

export interface EventMembersListModalProps {
  showModal: boolean;
  members: Array<ParticipantModel>
  onClose: () => void;
}
