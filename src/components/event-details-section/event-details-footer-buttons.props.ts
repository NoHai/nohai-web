import { EventDetailsViewModel } from '../../contracts/models';

export interface EventDetailsFooterProps {
  event: EventDetailsViewModel;
  userId: string;
  requestSent: boolean;
  leaveEvent: () => void;
  cancelEvent: () => void;
  cancelRequest: () => void;
}
