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

        result.locationDetails.StreetName = model.address.streetName;
        result.locationDetails.City = model.address.city.name;
        result.locationDetails.County = model.address.county.name;
        result.participantsDetails.FreeSpots = model.freeSpots;
        result.participantsDetails.TotalParticipants =10;
        result.participantsDetails.PriceForParticipant = model.cost;
        result.participantsDetails.Sport = model.sport;
        result.participantsDetails.Level = model.level;

        return result;
    }
}
