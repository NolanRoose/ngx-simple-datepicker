import {DateTime} from 'luxon';

export class DateHelper {
  public static isoDateStringToJSDate(isoDate: string): Date {
    if (!isoDate) {
      return DateTime.invalid('Invalid date').toJSDate();
    }
    return DateTime.fromISO(isoDate).plus({hour: 1}).toJSDate();
  }

  public static jsDateToFormattedDate(date: Date): string {
    return DateTime.fromJSDate(date).plus({hour: 1}).toFormat('dd/MM/yyyy');
  }

  public static jsDateToUtc(date: Date): number {
    return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  }

  public static formattedDateToIsoDate(formattedDate: string): string {
    return DateTime.fromFormat(formattedDate, 'dd/MM/yyyy').toISODate();
  }

  public static isValidDate(date: Date): boolean {
    return DateTime.fromJSDate(date).isValid;
  }
}
