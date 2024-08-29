import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { changeUnit } from '../ultils/change-unit';
import { differenceDates } from '../ultils/difference-dates';

export async function getDays(
  request: FastifyRequest<{
    Params: { firstDate: string; secondDate: string; unit: string }
  }>,
  reply: FastifyReply,
) {
  console.log(request.body)
  const getDaysParamsSchema = z.object({
    firstDate: z.string().datetime({ offset: true }),
    secondDate: z.string().datetime({ offset: true }),
    unit: z.enum(['seconds', 'minutes', 'hours', 'year','default']).default('default'),
  })
  const { firstDate, secondDate, unit } = getDaysParamsSchema.parse(
    request.body,
  )
  
  const differenceMilliseconds = differenceDates(firstDate, secondDate)
  const difference = differenceMilliseconds / (1000 * 60 * 60 * 24)
  if (unit !== 'default') {
    const differenceInDifferentUnit = changeUnit(difference, 'days', unit)
    return reply.status(200).send({ difference: differenceInDifferentUnit })
  }

  return reply.status(200).send({ difference })
}
