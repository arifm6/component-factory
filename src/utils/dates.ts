export function dateToYearString(date: Date) {
  return date.getFullYear().toString();
}
export function dateToMonthYearString(date: Date) {
  return `${date.toLocaleString("default", {
    month: "long",
  })} ${date.getFullYear()}`;
}
