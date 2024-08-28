export function differenceDates(date1: string, date2: string): number {
  const date1Parsed = Date.parse(date1)
  const date2Parsed = Date.parse(date2)

  const difference = date2Parsed - date1Parsed
  return difference
}
