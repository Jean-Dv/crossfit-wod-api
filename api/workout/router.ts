import { Router } from 'express'

import { WorkoutHttpHandler } from './http'
import { RecordHttpHandler } from '../record/http'

export const workoutRouter = Router()
const recordHttpHandler = new RecordHttpHandler()
const workoutHttpHandler = new WorkoutHttpHandler()

workoutRouter.get('/', workoutHttpHandler.getAllWorkouts)

workoutRouter.get('/:workoutId', workoutHttpHandler.getOneWorkout)

workoutRouter.get('/:workoutId/records', recordHttpHandler.getRecordForWorkout)

workoutRouter.post('/', workoutHttpHandler.createNewWorkout)

workoutRouter.patch('/:workoutId', workoutHttpHandler.updateOneWorkout)

workoutRouter.delete('/:workoutId', workoutHttpHandler.deleteOneWorkout)
