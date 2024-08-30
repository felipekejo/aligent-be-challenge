import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../src/app'

describe('DateTime API', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should return the difference in days', async () => {
    const result = await request(app.server)
      .post('/api/days')
      .send({
        firstDate: '2020-01-01T00:00:00.123+02:00',
        secondDate: '2020-01-05T00:00:00.123+02:00',
      })
      .expect(200)

    expect(result.body.difference).toEqual(4)
  })
  it('should return completed days', async () => {
    const result = await request(app.server)
      .post('/api/days')
      .send({
        firstDate: '2020-01-01T23:00:00.123+02:00',
        secondDate: '2020-01-05T22:59:59.123+02:00',
      })
      .expect(200) // It is missing one second to complete the day

    expect(result.body.difference).toEqual(3)
  })
  it('should not allow the first date to be greater than the second', async () => {
    await request(app.server)
      .post('/api/days')
      .send({
        firstDate: '2020-01-08T00:00:00.123+02:00',
        secondDate: '2020-01-05T00:00:00.123+02:00',
      })
      .expect(400)
  })
  it('should return the difference in weekdays', async () => {
    const result = await request(app.server)
      .post('/api/weekdays')
      .send({
        firstDate: '2020-01-01T00:00:00.123+02:00',
        secondDate: '2020-01-09T00:00:00.123+02:00',
      })
      .expect(200)

    expect(result.body.difference).toEqual(6)
  })
  it('should return completed days', async () => {
    const result = await request(app.server)
      .post('/api/weekdays')
      .send({
        firstDate: '2020-01-01T23:00:00.123+02:00',
        secondDate: '2020-01-05T22:59:59.123+02:00',
      })
      .expect(200) // It is missing one second to complete the day

    expect(result.body.difference).toEqual(2)
  })
  it('should not allow the first date to be greater than the second', async () => {
    await request(app.server)
      .post('/api/weekdays')
      .send({
        firstDate: '2020-01-08T00:00:00.123+02:00',
        secondDate: '2020-01-05T00:00:00.123+02:00',
      })
      .expect(400)
  })
  it('should return the difference in weeks', async () => {
    const result = await request(app.server)
      .post('/api/weeks')
      .send({
        firstDate: '2020-01-01T00:00:00.123+02:00',
        secondDate: '2020-01-15T00:00:00.123+02:00',
      })
      .expect(200)

    expect(result.body.difference).toEqual(2)
  })
  it('should return the difference in weeks', async () => {
    const result = await request(app.server)
      .post('/api/weeks')
      .send({
        firstDate: '2020-01-01T00:00:00.123+02:00',
        secondDate: '2020-01-14T23:59:59.123+02:00',
      })
      .expect(200)
    // It is missing one second to complete the week

    expect(result.body.difference).toEqual(1)
  })
  it('should not allow the first date to be greater than the second', async () => {
    await request(app.server)
      .post('/api/weeks')
      .send({
        firstDate: '2020-01-08T00:00:00.123+02:00',
        secondDate: '2020-01-05T00:00:00.123+02:00',
      })
      .expect(400)
  })
})
