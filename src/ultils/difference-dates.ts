export function differenceDates(firstDate: string, secondDate: string): number {
  const firstDateParsed = Date.parse(firstDate)
  const secondDateParsed = Date.parse(secondDate)

  const difference = secondDateParsed - firstDateParsed
  return difference
}
