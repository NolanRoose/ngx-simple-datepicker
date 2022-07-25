import {DateTime} from 'luxon';

export class DateHelper {
  public static stringToDate(date: string): Date {
    return DateTime.fromFormat(date, 'dd/MM/yyyy').toJSDate();
  }

  public static formatDateToShortDate(date: Date): string {
    return DateTime.fromJSDate(date).toFormat('dd/MM/yyyy');
  }

  public static isValidDate(date: Date): boolean {
    return DateTime.fromJSDate(date).isValid;
  }
}
