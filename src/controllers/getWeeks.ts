import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { changeUnit } from "../utils/change-unit";
import { differenceDates } from "../utils/difference-dates";

export async function getWeeks(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  console.log(request.body)
  const getWeeksParamsSchema = z.object({
    firstDate: z.string().datetime({ offset: true }),
    secondDate: z.string().datetime({ offset: true }),
    unit: z.enum(['seconds', 'minutes', 'hours', 'years','default']).default('default'),
  })
  const { firstDate, secondDate, unit } = getWeeksParamsSchema.parse(
    request.body,
  )
  const differenceMilliseconds = differenceDates(firstDate, secondDate)

  const differenceInCompletedWeeks = Math.floor(differenceMilliseconds / (1000 * 60 * 60 * 24 * 7)) 

  if (unit !== 'default') {
    const differenceInDifferentUnit = changeUnit(differenceInCompletedWeeks, 'weeks', unit)
    return reply.status(200).send({ difference: differenceInDifferentUnit })
  }

  return reply.status(200).send({ difference:differenceInCompletedWeeks })
}