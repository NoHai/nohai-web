import { ParticipantsEventDetailsModel } from '../models/participants-event-details.model';
import { LocationEventDetailsModel } from '../models/location-event-details.model';
import { DescriptionEventModel } from '../models/description-event.model';
import { EventModel } from '../models/event.model';
import { SportModel } from '../models/sport.model';
import { ParticipantModel } from '../models/participant.model';
export class EventDetailsViewModel {
  sport!: SportModel;
  event!: EventModel;
  participantsDetails!: ParticipantsEventDetailsModel;
  locationDetails!: LocationEventDetailsModel;
  description!: DescriptionEventModel;
  participants!: ParticipantModel[];
  owner!: ParticipantModel;

  constructor() {
    this.sport = new SportModel();
    this.event = new EventModel();
    this.participantsDetails = new ParticipantsEventDetailsModel();
    this.locationDetails = new LocationEventDetailsModel();
    this.description = new DescriptionEventModel();
    this.participants = [];
    this.owner = new ParticipantModel();
  }
}
