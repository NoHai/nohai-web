import moment from 'moment';

export default class DateHelper {
  public static GetMonths() {
    const months = [
      'Ianuarie',
      'Februarie',
      'Martie',
      'Aprilie',
      'Mai',
      'Iunie',
      'Iulie',
      'August',
      'Septembrie',
      'Octombrie',
      'Noiembrie',
      'Decembrie',
    ];

    return months;
  }

  public static GetDateFormat(date: string, format: string = 'DD/MM/YY') {
    return moment(date, 'YYYY-MM-DD').format(format);
  }

  public static GetDateFromString(date: string, format: string = 'YYYY-MM-DD') {
    if (date) {
      return moment(date, format);
    } else {
      return null;
    }
  }

  public static GetDuration(startDate: string, endDate: string) {
    var ms = moment(endDate, 'YYYY-MM-DD HH:mm').diff(moment(startDate, 'YYYY-MM-DD HH:mm'));
    var d = moment.duration(ms);
    var s = Math.floor(d.asHours()) + 'h ' + moment.utc(ms).format('mm') + 'm';
    return s;
  }
}
