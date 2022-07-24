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
    const message = workoutController.getOneWorkout()
    return res.status(200).json({
      ok: true,
      message: message
    })
  }

  createNewWorkout (req: Request, res: Response): Response {
    const { body } = req
    const { name, mode, equipment, exercises, trainerTips } = body
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!name || !mode || !equipment || !exercises || !trainerTips) {
      return res.status(400).json({
        ok: false,
        message: 'Missing data'
      })
    }
    const createNewWorkout = workoutController.createNewWorkout({ name, mode, equipment, exercises, trainerTips })
    return res.status(200).json({
      ok: true,
      data: createNewWorkout
    })
  }

  updateOneWorkout (req: Request, res: Response): Response {
    const message = workoutController.updateOneWorkout()
    return res.status(200).json({
      ok: true,
      message: message
    })
  }

  deleteOneWorkout (req: Request, res: Response): Response {
    const message = workoutController.deleteOneWorkout()
    return res.status(200).json({
      ok: true,
      message: message
    })
  }
}
