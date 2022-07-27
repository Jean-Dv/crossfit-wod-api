import request from 'supertest'

import { appServer, routePrefix } from '../app'

describe(`CRUD ${routePrefix}/workouts (successfully)`, () => {
  test('should return 200 and all workouts into array', async () => {
    const response = await request(appServer)
      .get(`${routePrefix}/workouts`)
    expect(response.statusCode).toBe(200)
    expect(response.body.data[0]).toMatchObject({ name: 'Tommy V' })
  })

  test('should return 200 and data with new workout', async () => {
    const newWorkout = {
      name: 'Core Buster',
      mode: 'AMRAP 20',
      equipment: [
        'rack',
        'barbell',
        'abmat'
      ],
      exercises: [
        '15 toes to bars',
        '10 thrusters',
        '30 abmat sit-ups'
      ],
      trainerTips: [
        'Split your toes to bars into two sets maximum',
        'Go unbroken on the thrusters',
        'Take the abmat sit-ups as a chance to normalize your breath'
      ]
    }
    const response = await request(appServer)
      .post(`${routePrefix}/workouts`)
      .set('Accept', 'application/json')
      .send(newWorkout)
    expect(response.statusCode).toBe(201)
    expect(response.body.data).toMatchObject({ name: 'Core Buster' })
  })

  test('should return 200 and data with one workout', async () => {
    const response = await request(appServer)
      .get(`${routePrefix}/workouts/4a3d9aaa-608c-49a7-a004-66305ad4ab50`)
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toMatchObject({ name: 'Dead Push-Ups' })
  })

  test('should return 200 and data updated with updated date now', async () => {
    const dataUpdate = {
      name: 'Dead Push-Ups With Weights'
    }
    const response = await request(appServer)
      .patch(`${routePrefix}/workouts/4a3d9aaa-608c-49a7-a004-66305ad4ab50`)
      .set('Accept', 'application/json')
      .send(dataUpdate)
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toMatchObject(dataUpdate)
  })

  test('should return 200 and deleted workout', async () => {
    const response = await request(appServer)
      .delete(`${routePrefix}/workouts/4a3d9aaa-608c-49a7-a004-66305ad4ab50`)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toContain('Delete workout successfully!')
  })

  test('should return 200 and all records reference with workout', async () => {
    const response = await request(appServer)
      .get(`${routePrefix}/workouts/4a3d9aaa-608c-49a7-a004-66305ad4ab50/records`)
    expect(response.statusCode).toBe(200)
    expect(response.body.data[1]).toMatchObject({ record: '145 reps' })
  })
})

describe(`CRUD ${routePrefix}/workouts (failed)`, () => {
  test('should return 400 and data with error specified', async () => {
    const newWorkout = {
      name: 'Tommy V',
      mode: 'AMRAP 20',
      equipment: [
        'rack',
        'barbell',
        'abmat'
      ],
      exercises: [
        '15 toes to bars',
        '10 thrusters',
        '30 abmat sit-ups'
      ],
      trainerTips: [
        'Split your toes to bars into two sets maximum',
        'Go unbroken on the thrusters',
        'Take the abmat sit-ups as a chance to normalize your breath'
      ]
    }
    const response = await request(appServer)
      .post(`${routePrefix}/workouts`)
      .set('Accept', 'application/json')
      .send(newWorkout)
    expect(response.statusCode).toBe(400)
    expect(response.body.data.error).toContain('already exists')
  })
})
