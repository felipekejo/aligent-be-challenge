import { describe, expect, it } from 'vitest'
import { differenceDates } from '../src/utils/difference-dates'

describe('Difference dates function', () => {
  it('should return difference in milliseconds', async () => {
    const result = differenceDates(
      '2024-03-22T00:00:00.123-03:00',
      '2024-03-23T00:00:00.123-03:00',
      'default',
    )

    expect(result).toBe(1000 * 60 * 60 * 24)
  })

  it('should return difference in seconds', async () => {
    const result = differenceDates(
      '2024-03-22T00:00:00.123-03:00',
      '2024-03-23T00:00:00.123-03:00',
      'seconds',
    )

    expect(result).toBe(60 * 60 * 24)
  })

  it('should return difference in minutes', async () => {
    const result = differenceDates(
      '2024-03-22T00:00:00.123-03:00',
      '2024-03-23T00:00:00.123-03:00',
      'minutes',
    )

    expect(result).toBe(60 * 24)
  })

  it('should return difference in hours', async () => {
    const result = differenceDates(
      '2024-03-22T00:00:00.123-03:00',
      '2024-03-23T00:00:00.123-03:00',
      'hours',
    )

    expect(result).toBe(24)
  })

  it('should return difference in years', async () => {
    const result = differenceDates(
      '1987-03-23T00:00:00.123-03:00',
      '2024-03-22T00:00:00.123-03:00',
      'years',
    )

    expect(result).toBe(36)
  })
})
