import {DateTime} from 'luxon';

export class DateHelper {
  public static isoDateStringToJSDate(isoDate: string): Date {
    return new Date(isoDate);
  }

  public static jsDateToFormattedDate(date: Date): string {
    const utc = DateHelper.jsDateToUtc(date);
    const isoDate = new Date(utc).toISOString();
    const dateTimeUtc = DateTime.fromISO(isoDate, {zone: 'utc'});
    return dateTimeUtc.toFormat('dd/MM/yyyy');
  }

  public static jsDateToUtc(date: Date): number {
    return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  }

  public static formattedDateToIsoDate(formattedDate: string): string {
    return DateTime.fromFormat(formattedDate, 'dd/MM/yyyy').toISODate();
  }

  public static isValidDate(date: Date): boolean {
    return DateTime.fromJSDate(date).isValid;
  }
}
