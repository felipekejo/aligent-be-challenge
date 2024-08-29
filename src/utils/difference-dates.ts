export function differenceDates(
  firstDate: string,
  secondDate: string,
): number {
  const firstDateParsed = Date.parse(firstDate)
  const secondDateParsed = Date.parse(secondDate)

  // Ensure the difference is always positive
  const differenceMilliseconds = Math.abs(secondDateParsed - firstDateParsed);

  return differenceMilliseconds
}
