export function differenceDates(
  firstDate: string,
  secondDate: string,
  unit: string,
): number {
  const firstDateParsed = Date.parse(firstDate)
  const secondDateParsed = Date.parse(secondDate)

  // Ensure the difference is always positive
  const differenceMilliseconds = Math.abs(secondDateParsed - firstDateParsed)
  switch (unit) {
    case 'seconds':
      return Math.floor(differenceMilliseconds / 1000) // Return difference in seconds
    case 'minutes':
      return Math.floor(differenceMilliseconds / (1000 * 60)) // Return difference in minutes
    case 'hours':
      return Math.floor(differenceMilliseconds / (1000 * 60 * 60)) // Return difference in hours
    case 'years': {
      // Calculate the year difference
      const yearDiff = Math.abs(
        new Date(secondDate).getUTCFullYear() -
          new Date(firstDate).getUTCFullYear(),
      )

      // Check if we need to adjust the year difference by comparing month and day
      const isEndDateEarlierInYear =
        new Date(secondDate).getUTCMonth() <
          new Date(firstDate).getUTCMonth() ||
        (new Date(secondDate).getUTCMonth() ===
          new Date(firstDate).getUTCMonth() &&
          new Date(secondDate).getUTCDate() < new Date(firstDate).getUTCDate())

      // If the second date is earlier in the year than the first date, subtract 1 year
      return isEndDateEarlierInYear ? yearDiff - 1 : yearDiff
    }
    default:
      return differenceMilliseconds // Fallback to milliseconds if unit is default
  }
}
