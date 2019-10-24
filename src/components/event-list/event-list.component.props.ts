import { EventDetailsViewModel } from '../../contracts/models';

export interface EventListProps {
  eventDetails: EventDetailsViewModel[];
  hasMoreItems: boolean;
  onEventsDetailsChange?: () => Promise<void>;
}
