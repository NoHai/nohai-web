import { EventDetailsViewModel } from "../contracts/models";
import { UserViewModel } from "../contracts/view-models/user-view.model";
import { NotificationModel } from "../contracts/models/notification.model";
import { SportModel } from "../contracts/models/sport.model";
import { ParticipantModel } from "../contracts/models/participant.model";

export default class MapModelHelper {
    public static MapEvent(model: any): EventDetailsViewModel {
        let result = new EventDetailsViewModel();
        result.description.Description = model.description;
        result.description.Date = model.date;
        result.description.Duration = model.duration;
        result.description.Time = model.hour;

        result.event.Id = model.id;
        result.event.Name = model.title;
        result.owner.FirstName = model.owner.firstName;
        result.owner.LastName = model.owner.lastName;
        result.owner.Status = model.owner.Status;
        result.owner.Url = model.owner.picture;
        result.owner.Id = model.owner.id;

        result.locationDetails.StreetName = model.address.streetName;
        result.locationDetails.City = model.address.city;
        result.locationDetails.County = model.address.county;
        result.locationDetails.Longitude = model.address.longitude;
        result.locationDetails.Latitude = model.address.latitude;

        result.participantsDetails.FreeSpots = model.freeSpots;
        result.participantsDetails.TotalParticipants = model.sport.defaultParticipantsNumber;
        result.participantsDetails.PriceForParticipant = model.cost;
        result.sport.Id = model.sport.id;
        result.sport.Name = model.sport.name;
        result.sport.ParticipantNumber = model.sport.participantNumber;
        result.sport.Description = model.sport.description;
        result.participantsDetails.Level = model.level;

        return result;
    }

    public static MapEventDetails(model: any): EventDetailsViewModel {
        let result = this.MapEvent(model.event);
        result.participants = model.userEvents.forEach((participant: any) => this.MapEventParticipant(participant));

        return result;
    }

    public static MapUser(model: any): UserViewModel {
        let result = new UserViewModel();
        result.user.Id = model.id;
        result.user.FirstName = model.firstName;
        result.user.LastName = model.lastName;
        result.user.Email = model.login;
        result.user.Url = model.picture;

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
            result.NotificationType = model.notificationType;
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
            result.ParticipantNumber = model.participantNumber;
        }
        return result;
    }

    private static MapEventParticipant(model: any): ParticipantModel {
        let result = new ParticipantModel();
        if (model) {
            result.Id = model.user.id;
            result.FirstName = model.user.firstName;
            result.LastName = model.user.lastName;
            result.Status = model.status;
            result.Url = model.user.picture;
        }

        return result;
    }
}
