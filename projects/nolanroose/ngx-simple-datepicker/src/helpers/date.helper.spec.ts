import {DateHelper} from './date.helper';

describe('DateHelper', () => {
  it('isoDateStringToJSDate should be return correct date', () => {
    const isoDate = '2022-07-30';
    const date = DateHelper.isoDateStringToJSDate(isoDate);
    expect(date.getFullYear()).toBe(2022);
    expect(date.getMonth() + 1).toBe(7);
    expect(date.getDate()).toBe(30);
    expect(date.getHours()).toBe(0);
    expect(date.getMinutes()).toBe(0);
    expect(date.getSeconds()).toBe(0);
    expect(date.getMilliseconds()).toBe(0);
  });

  it('isoDateStringToJSDate should be return invalid date', () => {
    const date = DateHelper.isoDateStringToJSDate('');
    expect(date.toString()).toBe('Invalid Date');
  });

  it('isoDateStringToFormattedDate should be return correct formatted date', () => {
    const isoDate = '2022-07-30';
    const formattedDate = DateHelper.isoDateStringToFormattedDate(isoDate);
    expect(formattedDate).toBe('30/07/2022');
  });

  it('jsDateToFormattedDate should be return correct formatted date', () => {
    const date = new Date(2022, 6, 30, 0, 0, 0, 0);
    const formattedDate = DateHelper.jsDateToFormattedDate(date);
    expect(formattedDate).toBe('30/07/2022');
  });

  it('jsDateToIsoDate should be return correct iso date', () => {
    const date = new Date(2022, 6, 30, 0, 0, 0, 0);
    const isoDate = DateHelper.jsDateToIsoDate(date);
    expect(isoDate).toBe('2022-07-30');
  });

  it('formattedDateToIsoDate should be return correct iso date', () => {
    const formattedDate = '30/07/2022';
    const isoDate = DateHelper.formattedDateToIsoDate(formattedDate);
    expect(isoDate).toBe('2022-07-30');
  });

  it('isValidDate should be return correct boolean', () => {
    const date = new Date(2022, 6, 30, 0, 0, 0, 0);
    const isValid = DateHelper.isValidDate(date);
    expect(isValid).toBe(true);
  });

  it('isoDatesHasDiff should be return correct boolean', () => {
    const isoA = '2022-07-30';
    const isoB = '2022-07-31';

    expect(DateHelper.isoDatesHasDiff(isoA, isoB)).toBe(true);
    expect(DateHelper.isoDatesHasDiff(isoA, isoA)).toBe(false);
    expect(DateHelper.isoDatesHasDiff(isoB, isoA)).toBe(true);
  });
});
