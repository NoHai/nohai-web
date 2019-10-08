import { EventDetailsViewModel } from '../../contracts/models';

export interface EventListProps {
  eventDetails: Array<EventDetailsViewModel>;
  hasMoreItems: boolean;
  onEventsDetailsChange?: (
  ) =>{};
}
