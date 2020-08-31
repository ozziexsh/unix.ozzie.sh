import { Moment } from 'moment';

export function setTz(date: Moment, isUtc: boolean) {
  if (isUtc) {
    return date.clone().utc();
  }
  return date.clone();
}
