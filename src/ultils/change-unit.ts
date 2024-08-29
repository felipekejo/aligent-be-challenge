export function changeUnit(
  difference: number,
  initialUnit: string,
  finalUnit: string,
): number {
let differenceMilliseconds = 0

  // Convert the initial unit to milliseconds
  switch (initialUnit) {
    case 'weeks':
      differenceMilliseconds = difference * (1000 * 60 * 60 * 24 * 7);
      break;
    default: // Default is days
      differenceMilliseconds = difference * (1000 * 60 * 60 * 24);
      break;
  }

  switch (finalUnit) {
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
