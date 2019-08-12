import { ParticipantsEventDetailsModel } from "../models/participants-event-details.model";
import { LocationEventDetailsModel } from "../models/location-event-details.model";
import { DescriptionEventModel } from "../models/description-event.model";
import { EventModel } from "../models/event.model";
export class EventDetailsViewModel  {
    event!:EventModel
    participantsDetails!: ParticipantsEventDetailsModel;
    locationDetails!:LocationEventDetailsModel;
    description!:DescriptionEventModel;

    constructor(){
        this.event=new EventModel();
        this.participantsDetails=new ParticipantsEventDetailsModel();
        this.locationDetails= new LocationEventDetailsModel();
        this.description= new DescriptionEventModel();
    }
}