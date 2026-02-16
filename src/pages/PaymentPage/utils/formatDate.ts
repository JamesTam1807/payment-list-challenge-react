export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);

  const pad = (value: number) => String(value).padStart(2, '0');

  const day = pad(date.getUTCDate());
  const month = pad(date.getUTCMonth() + 1);
  const year = date.getUTCFullYear();

  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());

  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
};
