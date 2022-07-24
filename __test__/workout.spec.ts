import request from 'supertest'

import { appServer, server, routePrefix } from '../app'

describe(`CRUD ${routePrefix}/workouts`, () => {
  test('should return 200 and all workouts into array', async () => {
    const response = await request(appServer)
      .get(`${routePrefix}/workouts`)
    expect(response.statusCode).toBe(200)
    expect(response.body.data[0]).toMatchObject({ name: 'Tommy V' })
  })
})

afterAll(() => {
  server.close()
})
