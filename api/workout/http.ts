import { Request, Response } from 'express'
import { WorkoutController } from './controller'

const workoutController = new WorkoutController()

export class WorkoutHttpHandler {
  getAllWorkouts (req: Request, res: Response): Response {
    const { mode } = req.query
    try {
      const data = workoutController.getAllWorkouts({ mode })
      return res.status(200).json({
        ok: true,
        data: data
      })
    } catch (error: any) {
      return res.status(error.code !== undefined ? error.code : 500).json({
        ok: false,
        data: {
          error: error.message !== undefined ? error.message : error
        }
      })
    }
  }

  getOneWorkout (req: Request, res: Response): Response {
    const {
      params: { workoutId }
    } = req
    if (workoutId.length === 0) {
      return res.status(400).json({
        ok: false,
        data: {
          error:
          "Parameter ':workoutId' can not be empty"
        }
      })
    }
    try {
      const workout = workoutController.getOneWorkout(workoutId)
      return res.status(200).json({
        ok: true,
        data: workout
      })
    } catch (error: any) {
      return res.status(error.code !== undefined ? error.code : 500).json({
        ok: false,
        data: {
          error: error.message !== undefined ? error.message : error
        }
      })
    }
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
      return res.status(error.code !== undefined ? error.code : 500).json({
        ok: false,
        data: {
          error: error.message !== undefined ? error.message : error
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
      return res.status(400).json({
        ok: false,
        data: {
          error:
          "Parameter ':workoutId' can not be empty"
        }
      })
    }
    try {
      const updatedWorkout = workoutController.updateOneWorkout(workoutId, body)
      return res.status(200).json({
        ok: true,
        data: updatedWorkout
      })
    } catch (error: any) {
      return res.status(error.code !== undefined ? error.code : 500).json({
        ok: false,
        data: {
          error: error.message !== undefined ? error.message : error
        }
      })
    }
  }

  deleteOneWorkout (req: Request, res: Response): Response | undefined {
    const {
      params: { workoutId }
    } = req
    if (workoutId.length === 0) {
      return res.status(400).json({
        ok: false,
        data: {
          error:
          "Parameter ':workoutId' can not be empty"
        }
      })
    }
    try {
      workoutController.deleteOneWorkout(workoutId)
      return res.status(200).json({
        ok: true,
        message: 'Delete workout successfully!'
      })
    } catch (error: any) {
      return res.status(error.code !== undefined ? error.code : 500).json({
        ok: false,
        data: {
          error: error.message !== undefined ? error.message : error
        }
      })
    }
  }
}
