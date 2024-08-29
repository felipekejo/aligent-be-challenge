import { FastifyInstance } from 'fastify'
import { getDays } from '../controllers/getDays'
import { getWeekDays } from '../controllers/getWeekDays'
import { getWeeks } from '../controllers/getWeeks'

export async function dateTimeApi(app: FastifyInstance) {
  app.post('/days', getDays)
  app.post('/weekdays', getWeekDays)
  app.post('/weeks',getWeeks)
}
