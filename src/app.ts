import fastify from 'fastify'
import { dateTimeApi } from './routes/dateTimeApi'

export const app = fastify()

app.register(dateTimeApi, { prefix: '/api' })
