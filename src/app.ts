import fastify from 'fastify'
import { dateTimeApi } from './dateTimeApi'

export const app = fastify()

app.get('/', dateTimeApi)
