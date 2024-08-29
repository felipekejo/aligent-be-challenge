import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { changeUnit } from "../ultils/change-unit";
import { differenceDates } from "../ultils/difference-dates";

export async function getWeeks(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getWeeksParamsSchema = z.object({
    firstDate: z.string().datetime({ offset: true }),
    secondDate: z.string().datetime({ offset: true }),
    unit: z.enum(['seconds', 'minutes', 'hours', 'year','default']).default('default'),
  })
  const { firstDate, secondDate, unit } = getWeeksParamsSchema.parse(
    request.body,
  )
  const differenceMilliseconds = differenceDates(firstDate, secondDate)

  const difference = Math.floor(differenceMilliseconds / (1000 * 60 * 60 * 24 * 7))

  if (unit !== 'default') {
    const differenceInDifferentUnit = changeUnit(difference, 'days', unit)
    return reply.status(200).send({ difference: differenceInDifferentUnit })
  }

  return reply.status(200).send({ difference })
}