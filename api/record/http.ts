import { Request, Response } from 'express'
import { RecordController } from './controller'

const recordController = new RecordController()

export class RecordHttpHandler {
  getRecordForWorkout (req: Request, res: Response): Response {
    try {
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
      const records = recordController.getRecordForWorkout(workoutId)
      return res.status(200).json({
        ok: true,
        data: records
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
