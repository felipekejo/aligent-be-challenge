import fastify from 'fastify'
import { dateTimeApi } from './api'

export const app = fastify()

app.get('/', dateTimeApi)
