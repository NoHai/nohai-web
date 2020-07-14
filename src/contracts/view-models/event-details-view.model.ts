import { DescriptionEventModel } from '../models/description-event.model';
import { EventModel } from '../models/event.model';
import { LocationEventDetailsModel } from '../models/location-event-details.model';
import { ParticipantModel } from '../models/participant.model';
import { ParticipantsEventDetailsModel } from '../models/participants-event-details.model';
import { SportModel } from '../models/sport.model';
export class EventDetailsViewModel {
  event!: EventModel;
  participantsDetails!: ParticipantsEventDetailsModel;
  locationDetails!: LocationEventDetailsModel;
  description!: DescriptionEventModel;
  participants!: ParticipantModel[];
  owner!: ParticipantModel;
  status!: number;
  sport!: SportModel;

  constructor() {
    this.event = new EventModel();
    this.participantsDetails = new ParticipantsEventDetailsModel();
    this.locationDetails = new LocationEventDetailsModel();
    this.description = new DescriptionEventModel();
    this.participants = [];
    this.owner = new ParticipantModel();
    this.sport = new SportModel();
  }
}
