import { Request, Response } from 'express'
import { WorkoutController } from './controller'

const workoutController = new WorkoutController()

export class WorkoutHttpHandler {
  getAllWorkouts (req: Request, res: Response): Response {
    const data = workoutController.getAllWorkouts()
    return res.status(200).json({
      ok: true,
      data: data
    })
  }

  getOneWorkout (req: Request, res: Response): Response {
    const {
      params: { workoutId }
    } = req
    if (workoutId.length === 0) {
      return res.status(400).json({
        ok: false,
        message: 'Missing data'
      })
    }
    const workout = workoutController.getOneWorkout(workoutId)
    return res.status(200).json({
      ok: true,
      data: workout
    })
  }

  createNewWorkout (req: Request, res: Response): Response {
    const { body } = req
    const { name, mode, equipment, exercises, trainerTips } = body
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!name || !mode || !equipment || !exercises || !trainerTips) {
      return res.status(400).json({
        ok: false,
        data: {
          error:
          "One of the following keys is missing of is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'"
        }
      })
    }
    try {
      const createNewWorkout = workoutController.createNewWorkout({ name, mode, equipment, exercises, trainerTips })
      return res.status(201).json({
        ok: true,
        data: createNewWorkout
      })
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      return res.status(error.code || 500).json({
        ok: false,
        data: {
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          error: error.message || error
        }
      })
    }
  }

  updateOneWorkout (req: Request, res: Response): Response | undefined {
    const {
      body,
      params: { workoutId }
    } = req
    if (workoutId.length === 0) {
      return
    }
    const updatedWorkout = workoutController.updateOneWorkout(workoutId, body)
    return res.status(200).json({
      ok: true,
      data: updatedWorkout
    })
  }

  deleteOneWorkout (req: Request, res: Response): Response | undefined {
    const {
      params: { workoutId }
    } = req
    if (workoutId.length === 0) {
      return
    }
    workoutController.deleteOneWorkout(workoutId)
    return res.status(200).json({
      ok: true,
      message: 'Delete workout successfully!'
    })
  }
}
