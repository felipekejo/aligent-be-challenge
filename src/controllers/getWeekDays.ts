import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { differenceDates } from '../utils/difference-dates'

export async function getWeekDays(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getWeekDaysParamsSchema = z.object({
    firstDate: z.string().datetime({ offset: true }),
    secondDate: z.string().datetime({ offset: true }),
    unit: z
      .enum(['seconds', 'minutes', 'hours', 'years', 'default'])
      .default('default'),
  })
  const { firstDate, secondDate, unit } = getWeekDaysParamsSchema.parse(
    request.body,
  )
  if (firstDate > secondDate) {
    return reply
      .status(400)
      .send({ message: 'The first date must be older than the second date' })
  }

  const difference = differenceDates(firstDate, secondDate, unit)

  if (unit !== 'default') {
    return reply.status(200).send({ difference })
  }
  const differenceInCompletedDays = Math.floor(
    difference / (1000 * 60 * 60 * 24),
  )

  const startDay = new Date(firstDate).getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday)

  let differenceInCompletedWeekDays = 0

  for (let i = 0; i < differenceInCompletedDays; i++) {
    const currentDayNumber = (startDay + i) % 7 // calculate the current day number

    if (currentDayNumber >= 1 && currentDayNumber <= 5) {
      differenceInCompletedWeekDays++
    }
  }
  return reply.status(200).send({ difference: differenceInCompletedWeekDays })
}
