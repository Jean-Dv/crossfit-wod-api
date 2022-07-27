import { Router } from 'express'
import apicache from 'apicache'

import { WorkoutHttpHandler } from './http'
import { RecordHttpHandler } from '../record/http'

export const workoutRouter = Router()
const cache = apicache.middleware
const recordHttpHandler = new RecordHttpHandler()
const workoutHttpHandler = new WorkoutHttpHandler()

/**
 * @openapi
 * /api/v1/workouts:
 *   get:
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: The mode of a workout
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Workout"
 *       5XX:
 *         description: failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
workoutRouter.get('/', workoutHttpHandler.getAllWorkouts)

workoutRouter.get('/:workoutId', cache('2 minutes'), workoutHttpHandler.getOneWorkout)

workoutRouter.get('/:workoutId/records', cache('2 minutes'), recordHttpHandler.getRecordForWorkout)

workoutRouter.post('/', workoutHttpHandler.createNewWorkout)

workoutRouter.patch('/:workoutId', workoutHttpHandler.updateOneWorkout)

workoutRouter.delete('/:workoutId', workoutHttpHandler.deleteOneWorkout)
