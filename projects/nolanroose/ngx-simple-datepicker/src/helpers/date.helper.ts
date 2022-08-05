import {DateTime} from 'luxon';

export class DateHelper {
  public static isoDateStringToJSDate(isoDate: string): Date {
    if (!isoDate) {
      return DateTime.invalid('Invalid date').toJSDate();
    }
    return DateTime.fromISO(isoDate).toJSDate();
  }

  public static isoDateStringToFormattedDate(isoDate: string, format?: string): string {
    return DateTime.fromISO(isoDate).toFormat(format || 'dd/MM/yyyy');
  }

  public static jsDateToFormattedDate(date: Date, format?: string): string {
    return DateTime.fromJSDate(date).toFormat(format || 'dd/MM/yyyy');
  }

  public static jsDateToIsoDate(date: Date): string {
    return DateTime.fromJSDate(date).toISODate();
  }

  public static formattedDateToIsoDate(formattedDate: string): string {
    return DateTime.fromFormat(formattedDate, 'dd/MM/yyyy').toISODate();
  }

  public static isValidDate(date?: Date): boolean {
    return date ? DateTime.fromJSDate(date).isValid : false;
  }

  public static isoDatesHasDiff(currentIsoDate: string, newIsoDate: string): boolean {
    const currentDate = DateTime.fromISO(currentIsoDate);
    const nextDate = DateTime.fromISO(newIsoDate);
    return !currentDate.hasSame(nextDate, 'day') || !currentDate.hasSame(nextDate, 'month') || !currentDate.hasSame(nextDate, 'year');
  }
}
