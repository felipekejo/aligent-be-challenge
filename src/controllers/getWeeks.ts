import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { differenceDates } from "../utils/difference-dates";

export async function getWeeks(
  request: FastifyRequest,
  reply: FastifyReply,
) {

  const getWeeksParamsSchema = z.object({
    firstDate: z.string().datetime({ offset: true }),
    secondDate: z.string().datetime({ offset: true }),
    unit: z.enum(['seconds', 'minutes', 'hours', 'years','default']).default('default'),
  })
  const { firstDate, secondDate, unit } = getWeeksParamsSchema.parse(
    request.body,
  )

  if(firstDate>secondDate){
    return reply.status(400).send({ message: 'The first date must be older than the second date' })
}
  const difference = differenceDates(firstDate, secondDate, unit)

  

  if (unit !== 'default') { // If the unit is not default, return the converted difference that was returned from the differenceDates function
    
    return reply.status(200).send({ difference })
  }
  // If the unit is default, convert the difference to weeks
  const differenceInCompletedWeeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7)) 

  return reply.status(200).send({ difference:differenceInCompletedWeeks })
}