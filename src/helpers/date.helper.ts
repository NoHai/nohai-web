import moment from 'moment';
// import './../utilities/locale/ro.locale';

class DateHelperClass {
  private static instance: DateHelperClass;

  private constructor() {
    moment.locale('ro');
  }

  public static getInstance() {
    if (!DateHelperClass.instance) {
      DateHelperClass.instance = new DateHelperClass();
    }
    return DateHelperClass.instance;
  }

  public GetDateFormat(date: string, format: string = 'DD/MM/YY') {
    return moment(date, 'YYYY-MM-DD').format(format);
  }

  public GetDateFromString(date: string, format: string = 'YYYY-MM-DD') {
    if (date) {
      return moment(date, format);
    } else {
      return null;
    }
  }

  public GetDuration(startDate: string, endDate: string) {
    const ms = moment(endDate, 'YYYY-MM-DD HH:mm').diff(moment(startDate, 'YYYY-MM-DD HH:mm'));
    const d = moment.duration(ms);
    const s = Math.floor(d.asHours()) + 'h ' + moment.utc(ms).format('mm') + 'm';
    return s;
  }
}

const DateHelper = DateHelperClass.getInstance();
export default DateHelper;
