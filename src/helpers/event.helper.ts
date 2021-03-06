import { EventDetailsViewModel } from '../contracts/models';
import { SportLevelType } from '../contracts/enums/common/sport-level.type';
import DateHelper from './date.helper';
import moment from 'moment';

class EventHelperClass {
  private static instance: EventHelperClass;

  private constructor() {}

  public static getInstance() {
    if (!EventHelperClass.instance) {
      EventHelperClass.instance = new EventHelperClass();
    }
    return EventHelperClass.instance;
  }

  public getLevel(event: EventDetailsViewModel) {
    return SportLevelType[event.participantsDetails.Level];
  }

  public getPrice(event: EventDetailsViewModel) {
    const price = event.participantsDetails.PriceForParticipant;

    return price > 0 ? `${price} lei / persoana` : 'Gratis';
  }

  public getDate(event: EventDetailsViewModel) {
    const startDate = moment(event.description.StartDate).format('YYYY-MM-DD');
    const startDateString = DateHelper.GetDateFormat(startDate, 'dddd, DD MMMM');
    const endDate = moment(event.description.EndDate).format('YYYY-MM-DD');
    const endDateString = DateHelper.GetDateFormat(endDate, 'dddd, DD MMMM');

    return startDate === endDate ? startDateString : `${startDateString} - ${endDateString}`;
  }

  public getTime(event: EventDetailsViewModel) {
    const startTime = event.description.StartTime;
    const endTime = event.description.EndTime;

    return `${moment(startTime).format('HH:mm')} - ${moment(endTime).format('HH:mm')}`;
  }

  public isOwner(event: EventDetailsViewModel, userId: string) {
    return event.owner.Id === userId;
  }

  public isUserAccepted(event: EventDetailsViewModel, userId: string) {
    return event.participants && event.participants.some(x => x.Id === userId && x.Status === 1);
  }

  public isUserPending(event: EventDetailsViewModel, userId: string) {
    return event.participants && event.participants.some(x => x.Id === userId && x.Status === 0);
  }

  public isAvailable(event: EventDetailsViewModel) {
    return (
      event.event.Id &&
      (!event.participants ||
        !event.participantsDetails.FreeSpots ||
        event.participantsDetails.FreeSpots === 0 ||
        event.participants.length < event.participantsDetails.FreeSpots)
    );
  }

  public isAlreadyPast(event: EventDetailsViewModel) {
    var result = false;
    if (event.description.EndDate) {
      const endDate = moment(event.description.EndDate).format('YYYY-MM-DD');
      const endTime = moment(event.description.EndTime).format('HH:mm');
      const endDateTime = moment(endDate + ' ' + endTime, 'YYYY-MM-DD HH:mm');

      const currentDate = moment();

      result = endDateTime.isBefore(currentDate);
    }
    return result;
  }

  public isHappeningNow(event: EventDetailsViewModel) {
    const startDate = moment(event.description.StartDate).format('YYYY-MM-DD');
    const startTime = moment(event.description.StartTime).format('HH:mm');
    const startDateTime = moment(startDate + ' ' + startTime, 'YYYY-MM-DD HH:mm');
    const endDate = moment(event.description.EndDate).format('YYYY-MM-DD');
    const endTime = moment(event.description.EndTime).format('HH:mm');
    const endDateTime = moment(endDate + ' ' + endTime, 'YYYY-MM-DD HH:mm');

    const currentDate = moment();

    const result = currentDate.isBetween(startDateTime, endDateTime);
    return result;
  }

  public getAvailableSpots(event: EventDetailsViewModel) {
    return event.participantsDetails.FreeSpots > 0
      ? event.participantsDetails.FreeSpots - event.participants.filter(x => x.Status === 1).length
      : null;
  }

  public generateTitle(eventDetails: any) {
    return eventDetails.sport.Name
      ? `${eventDetails.sport.Name},
    ${moment(eventDetails.description.StartDate)
      .locale('ro')
      .format('dddd')}
    ${moment(eventDetails.description.StartDate).format('DD')} ${moment(
          eventDetails.description.StartDate
        ).format('MMMM')} ora ${moment(eventDetails.description.StartTime).format('HH:MM')}`
      : '';
  }
}

const EventHelper = EventHelperClass.getInstance();
export default EventHelper;
