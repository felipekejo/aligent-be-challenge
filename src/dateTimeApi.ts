import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function dateTimeApi(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const dateTimeApiBodySchema = z.object({
    firstDate: z.date(),
    secondDate: z.date(),
    timeZone: z.string(),
  })

  const { firstDate, secondDate, timeZone } = dateTimeApiBodySchema.parse(
    request.body,
  )

  return reply.status(200).send()
}
