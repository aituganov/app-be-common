export const addSeconds = (date: Date | number, seconds: number): Date => {
  var result = new Date(date);
  result.setSeconds(result.getSeconds() + seconds);
  return result;
}

export const addMinutes = (date: Date | number, minutes: number): Date => {
  return addSeconds(date, minutes * 60);
}

export const addDays = (date: Date | number, days: number): Date => {
  return addMinutes(date, days * 60 * 24);
}