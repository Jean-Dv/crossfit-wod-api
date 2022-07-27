import { Router } from 'express'
import apicache from 'apicache'

import { WorkoutHttpHandler } from './http'
import { RecordHttpHandler } from '../record/http'

export const workoutRouter = Router()
const cache = apicache.middleware
const recordHttpHandler = new RecordHttpHandler()
const workoutHttpHandler = new WorkoutHttpHandler()

workoutRouter.get('/', workoutHttpHandler.getAllWorkouts)

workoutRouter.get('/:workoutId', cache('2 minutes'), workoutHttpHandler.getOneWorkout)

workoutRouter.get('/:workoutId/records', cache('2 minutes'), recordHttpHandler.getRecordForWorkout)

workoutRouter.post('/', workoutHttpHandler.createNewWorkout)

workoutRouter.patch('/:workoutId', workoutHttpHandler.updateOneWorkout)

workoutRouter.delete('/:workoutId', workoutHttpHandler.deleteOneWorkout)
