import { ParticipantsEventDetailsModel } from "./participants-event-details.model";
import { LocationEventDetailsModel } from "./location-event-details.model";
import { DescriptionEventModel } from "./description-event.model";
import { EventModel } from "./event.model";
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