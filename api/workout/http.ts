import { Request, Response } from 'express'
import { WorkoutController } from './controller'

const workoutController = new WorkoutController()

export class WorkoutHttpHandler {
  getAllWorkouts (req: Request, res: Response): Response {
    const message = workoutController.getAllWorkouts()
    return res.status(200).json({
      ok: true,
      message: message
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
    const message = workoutController.createNewWorkout()
    return res.status(200).json({
      ok: true,
      message: message
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
