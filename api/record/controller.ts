import { CodeError } from '../workout/exception'
import { RecordService } from './service'
import { RecordInterface } from './types'

const recordService = new RecordService()

export class RecordController {
  getRecordForWorkout (workoutId: string): RecordInterface[] {
    try {
      const record = recordService.getRecordForWorkout(workoutId)
      return record
    } catch (error: any) {
      throw new CodeError(error)
    }
  }
}
