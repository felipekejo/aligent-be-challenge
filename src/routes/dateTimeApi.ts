import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { getDays } from '../controllers/getDays'

export async function dateTimeApi(app: FastifyInstance) {
  app.post('/days', getDays)
  app.get('/weekdays', async (request: FastifyRequest, reply: FastifyReply) => {
    const dateTimeApiBodySchema = z.object({
      firstDate: z.string().datetime(),
      secondDate: z.string().datetime(),
    })

    const { firstDate, secondDate, timeZone } = dateTimeApiBodySchema.parse(
      request.body,
    )

    return reply.status(200).send()
  })
  app.get('/weeks', async (request: FastifyRequest, reply: FastifyReply) => {
    const dateTimeApiBodySchema = z.object({
      firstDate: z.string().datetime(),
      secondDate: z.string().datetime(),
    })

    const { firstDate, secondDate, timeZone } = dateTimeApiBodySchema.parse(
      request.body,
    )

    return reply.status(200).send()
  })
}
