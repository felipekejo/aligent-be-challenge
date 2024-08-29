import { FastifyReply, FastifyRequest } from 'fastify';
import { differenceDates } from '../ultils/difference-dates';

export async function getDays(
  request: FastifyRequest<{
    Params: { firstDate: string; secondDate: string; unit: string }
  }>,
  reply: FastifyReply,
) {
  const getDaysParamsSchema = z.object({
    firstDate: z.string().datetime(),
    secondDate: z.string().datetime(),
    unit: z.enum(['seconds', 'minutes', 'hours', 'year']),
  })
  const { firstDate, secondDate, unit } = getDaysParamsSchema.parse(
    request.params,
  )

  const difference = differenceDates(firstDate, secondDate, unit)
}
