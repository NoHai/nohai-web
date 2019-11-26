import { EventDetailsViewModel } from '../contracts/models';
import { UserViewModel } from '../contracts/view-models/user-view.model';
import { NotificationModel } from '../contracts/models/notification.model';
import { SportModel } from '../contracts/models/sport.model';
import { ParticipantModel } from '../contracts/models/participant.model';

export default class MapModelHelper {
  public static MapEvent(model: any): EventDetailsViewModel {
    const result = new EventDetailsViewModel();
    result.description.Description = model.description;
    result.description.StartDate = model.startDate;
    result.description.EndDate = model.endDate;
    result.description.EndTime = model.endTime;
    result.description.StartTime = model.startTime;

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
    result.participantsDetails.TotalParticipants = model.numberOfParticipants;
    result.participantsDetails.PriceForParticipant = model.cost;
    result.sport.Id = model.sport.id;
    result.sport.Name = model.sport.name;
    result.sport.ParticipantNumber = model.sport.participantNumber;
    result.sport.Description = model.sport.description;
    result.sport.ImagePath = model.sport.imagePath;
    result.participantsDetails.Level = model.level;

    result.status=model.status

    return result;
  }

  public static MapEventDetails(model: any): EventDetailsViewModel {
    const result = this.MapEvent(model.event);
    model.userEvents.forEach((participant: any) =>
      result.participants.push(this.MapEventParticipant(participant))
    );

    return result;
  }

  public static MapUser(model: any): UserViewModel {
    const result = new UserViewModel();
    result.user.Id = model.id;
    result.user.FirstName = model.firstName;
    result.user.LastName = model.lastName;
    result.user.Email = model.login;
    result.user.Url = model.picture;

    result.details.DateOfBirth = model.dateOfBirth;
    result.sport.Name = model.favoriteSport.name;
    return result;
  }

  public static MapNotification(model: any): NotificationModel {
    const result = new NotificationModel();
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
      result.CreatedDate = model.createdDate;
    }
    return result;
  }

  public static MapSport(model: any): SportModel {
    const result = new SportModel();
    if (model) {
      result.Id = model.id;
      result.Description = model.description;
      result.Name = model.name;
      result.ParticipantNumber = model.participantNumber;
      result.ImagePath = model.imagePath;
    }
    return result;
  }

  private static MapEventParticipant(model: any): ParticipantModel {
    const result = new ParticipantModel();
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
