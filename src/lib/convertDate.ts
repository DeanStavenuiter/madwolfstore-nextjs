export function convertDate(timeStamp: Date) {
  const date = new Date(timeStamp);

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  };

  const formattedDate = date.toLocaleString('nl-NL', options);
  return formattedDate;
};
