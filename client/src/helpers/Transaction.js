export const formatTransaction = (
  _id,
  category,
  description,
  type,
  value,
  yearMonthDay
) => {
  const date = yearMonthDay.split('-');
  const [year, month, day] = date;
  const yearMonth = year + '-' + month;

  const transaction = {
    _id,
    category,
    day,
    description,
    month,
    type,
    value,
    year,
    yearMonth,
    yearMonthDay,
  };

  return transaction;
};
