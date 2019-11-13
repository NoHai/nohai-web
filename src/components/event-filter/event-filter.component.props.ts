import { FindEventRequest } from '../../contracts/requests/find-event.request';

export interface EventFilterProps {
  onOk: (eventRequest: FindEventRequest) => void;
}
