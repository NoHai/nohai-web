import { ParticipantsEventDetailsModel } from "./participants-event-details.model";
import { LocationEventDetailsModel } from "./location-event-details.model";
import { DescriptionEventModel } from "./description-event.model";
export class EventDetailsViewModel {
    participantsDetails!: ParticipantsEventDetailsModel;
    locationDetails!:LocationEventDetailsModel;
    description!:DescriptionEventModel;

    constructor(){
        this.participantsDetails=new ParticipantsEventDetailsModel();
        this.locationDetails= new LocationEventDetailsModel();
        this.description= new DescriptionEventModel();
    }
}