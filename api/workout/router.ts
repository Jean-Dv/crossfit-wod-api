import { Router } from 'express'

import { WorkoutHttpHandler } from './http'

export const workoutRouter = Router()
const workoutHttpHandler = new WorkoutHttpHandler()

workoutRouter.get('/', workoutHttpHandler.getAllWorkouts)

workoutRouter.get('/:workoutId', workoutHttpHandler.getOneWorkout)

workoutRouter.post('/', workoutHttpHandler.createNewWorkout)

workoutRouter.patch('/:workoutId', workoutHttpHandler.updateOneWorkout)

workoutRouter.delete('/:workoutId', workoutHttpHandler.deleteOneWorkout)
