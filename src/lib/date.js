export function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatDateForInput(date) {
  if (!date) {
    return getLocalDateString();
  }

  const parsedDate = new Date(`${date}T00:00:00`);
  return getLocalDateString(parsedDate);
}