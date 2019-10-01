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
    return moment(date).format(format);
  }
}
