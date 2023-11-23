export function formatNumberWithTwoDigits(number: number) {
  let numberStr = String(number);
  if (numberStr.length === 1) {
    numberStr = "0" + numberStr;
  }
  return numberStr;
}
