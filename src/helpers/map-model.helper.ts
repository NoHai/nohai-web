import { EventDetailsViewModel } from "../contracts/models";
import { UserViewModel } from "../contracts/view-models/user-view.model";
import { NotificationModel } from "../contracts/models/notification.model";
import { SportModel } from "../contracts/models/sport.model";

export default class MapModelHelper {
    public static MapEvent(model: any): EventDetailsViewModel {
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
        result.locationDetails.Longitude = model.address.longitude;
        result.locationDetails.Latitude = model.address.latitude;

        result.participantsDetails.FreeSpots = model.freeSpots;
        result.participantsDetails.TotalParticipants = model.sport.defaultParticipantsNumber;
        result.participantsDetails.PriceForParticipant = model.cost;
        result.sport = model.sport;
        result.participantsDetails.Level = model.level;

        return result;
    }

    public static MapUser(model: any): UserViewModel {
        let result = new UserViewModel();
        result.user.Id = model.id;
        result.user.FirstName = model.firstName;
        result.user.LastName = model.lastName;

        result.details.Day = model.dateOfBirth;
        result.details.Weight = model.weight;
        result.details.Height = model.height;
        return result;
    }

    public static MapNotification(model: any): NotificationModel {
        let result = new NotificationModel();
        if (model) {
            result.AvatarUrl = model.avatarUrl;
            result.Body = model.body;
            result.CreatedBy = model.createdUser;
            result.EventId = model.eventId;
            result.Id = model.id;
            result.NotificationType = model.type;
            result.Status = model.status;
            result.Title = model.title;
            result.UserId = model.userId;
        }
        return result;
    }

    public static MapSport(model: any): SportModel {
        let result = new SportModel();
        if (model) {
            result.Id = model.id;
            result.Description = model.description;
            result.Name = model.name;
            result.ParticipantNamber = model.participantNamber;
        }
        return result;
    }
}
