export function getDaysInMonthFromLocalDate(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function getStartDateTimeFromDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getEndDateTimeFromDate(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23, 59, 59, 999,
  );
}

export function getFirstDateTimeInMonthByDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getLastDateTimeInMonthByDate(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    getDaysInMonthFromLocalDate(date),
    23, 59, 59, 999,
  );
}

export default {
  getStartDateTimeFromDate,
  getEndDateTimeFromDate,
  getFirstDateTimeInMonthByDate,
  getLastDateTimeInMonthByDate,
  getDaysInMonthFromLocalDate,
};
