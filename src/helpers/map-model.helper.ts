import { EventDetailsViewModel } from "../contracts/models";

export default class MapModelHelper {
    public static MapEvent(model: any): EventDetailsViewModel{
        let result = new EventDetailsViewModel();
        result.description.Description = model.description;
        result.description.Date = model.date;
        result.description.Duration = model.duration;
        result.description.Time = model.hour;

        result.event.Name = model.title;
        result.event.Owner = model.owner;
        result.event.Id = model.id;

        result.locationDetails.Address = model.location;
        result.locationDetails.City = "Sibiu";
        result.participantsDetails.FreeSpots = model.participantsNumber;
        result.participantsDetails.TotalParticipants =10;
        result.participantsDetails.PriceForParticipant = model.cost;
        result.participantsDetails.Sport = model.sport;

        return result;
    }
}
