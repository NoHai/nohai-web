import { ParticipantsEventDetailsModel } from "./participants-event-details.model";
import { LocationEventDetailsModel } from "./location-event-details.model";
import { IsDefined, MinLength } from "class-validator";
export class EventDetailsViewModel {
    participantsDetails!: ParticipantsEventDetailsModel;
    locationDetails!:LocationEventDetailsModel;
    
    @IsDefined()
    @MinLength(10)
    description!:string;
    //TODO...

    constructor(){
        this.participantsDetails=new ParticipantsEventDetailsModel();
        this.locationDetails= new LocationEventDetailsModel();
    }
}