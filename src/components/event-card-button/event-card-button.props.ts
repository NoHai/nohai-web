import { EventDetailsViewModel } from '../../contracts/models';

export interface EventCardButtonProps {
  event: EventDetailsViewModel;
  userId: string;
  requestSent: boolean;
  onJoinClick: () => void;
  onEditClick: () => void;
}
