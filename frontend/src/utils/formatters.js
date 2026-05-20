export const currency = (value = 0) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);

export const dateTime = (value) => {
  if (!value) return '-';
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
};

export const dateOnly = (value) => {
  if (!value) return '-';
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(value));
};

export const capitalize = (value = '') =>
  value
    .toString()
    .toLowerCase()
    .replace(/(^|\s)\w/g, (letter) => letter.toUpperCase());
