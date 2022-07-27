import DB from '../../db.json'
import { CodeError } from '../workout/exception'
import { RecordInterface } from './types'

export class RecordService {
  getRecordForWorkout (workoutId: string): RecordInterface[] {
    try {
      const record = DB.records.filter((record) => record.workout === workoutId)
      if (record == null) {
        throw new CodeError({
          code: 400,
          message: `Can't find workout with the id '${workoutId}'`
        })
      }
      return record
    } catch (error: any) {
      throw new CodeError({
        code: error.code !== undefined ? error.code : 500,
        message: error.message !== undefined ? error.message : error
      })
    }
  }
}
