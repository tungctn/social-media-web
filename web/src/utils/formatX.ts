export function formatNumberWithTwoDigits(number: number) {
  let numberStr = String(number);
  if (numberStr.length === 1) {
    numberStr = "0" + numberStr;
  }
  return numberStr;
}

export function formatDate(d: string) {
  const jsDate = new Date(d);
  const date = jsDate.getDate();
  const month = jsDate.getMonth();
  const year = jsDate.getFullYear();

  return `${date}/${month}`;
}

export function formatDateOfMonth(d: string) {
  const jsDate = new Date(d);
  const date = jsDate.getDate();
  const month = jsDate.getMonth();
  const year = jsDate.getFullYear();

  return formatNumberWithTwoDigits(date);
}
