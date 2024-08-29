export function differenceDates(
  firstDate: string,
  secondDate: string,
  unit: string,
): number {
  const firstDateParsed = Date.parse(firstDate)
  const secondDateParsed = Date.parse(secondDate)

  let differenceMilliseconds = Math.abs(secondDateParsed - firstDateParsed);


  switch (unit) {
    case 'seconds':
      return differenceMilliseconds / 1000 // Return difference in seconds
    case 'minutes':
      return differenceMilliseconds / (1000 * 60) // Return difference in minutes
    case 'hours':
      return differenceMilliseconds / (1000 * 60 * 60) // Return difference in hours
    case 'year':
      return differenceMilliseconds / (1000 * 60 * 60 * 24 * 365) // Return difference in a year
    default:
      return differenceMilliseconds / (1000 * 60 * 60 * 24); // Fallback to days if unit is unrecognized
  }

}
