import {DateTime} from 'luxon';

export class DateHelper {
  public static isoDateStringToJSDate(isoDate: string): Date {
    if (!isoDate) {
      return DateTime.invalid('Invalid date').toJSDate();
    }
    return DateTime.fromISO(isoDate).toJSDate();
  }

  public static jsDateToFormattedDate(date: Date, format?: string): string {
    return DateTime.fromJSDate(date).toFormat(format || 'dd/MM/yyyy');
  }

  public static formattedDateToIsoDate(formattedDate: string): string {
    return DateTime.fromFormat(formattedDate, 'dd/MM/yyyy').toISODate();
  }

  public static isValidDate(date: Date): boolean {
    return DateTime.fromJSDate(date).isValid;
  }
}
