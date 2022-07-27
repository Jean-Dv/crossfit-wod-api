import { Workout } from '../../services/database/Workout'
import DB from '../../db.json'
import { WorkoutInterface, FilterParams } from './types'
import { CodeError } from './exception'
const workout = new Workout()

export class WorkoutService {
  getAllWorkouts (filterParams: FilterParams): object {
    try {
      const workouts = DB.workouts
      if (filterParams.mode !== undefined) {
        return DB.workouts.filter((workout) => {
          return workout.mode.toLowerCase().includes(filterParams.mode)
        })
      }
      return workouts
    } catch (error: any) {
      throw new CodeError(error)
    }
  }

  getOneWorkout (workoutId: string): WorkoutInterface | string {
    try {
      const workout = DB.workouts.find((workout) => workout.id === workoutId)
      if (workout == null) {
        throw new CodeError({
          code: 400,
          message: `Can't find workout with the id '${workoutId}'`
        })
      }
      return workout
    } catch (error) {
      throw new CodeError({ message: error, code: 500 })
    }
  }

  createNewWorkout (newWorkout: WorkoutInterface): WorkoutInterface {
    try {
      const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1
      if (isAlreadyAdded) {
        throw new CodeError({ message: `Workout with the name '${newWorkout.name}' already exists`, code: 400 })
      }

      DB.workouts.push(newWorkout)
      workout.saveToDatabase(DB)
      return newWorkout
    } catch (error: any) {
      throw new CodeError({
        code: error.code !== undefined ? error.code : 500,
        message: error.message !== undefined ? error.message : 500
      })
    }
  }

  updateOneWorkout (workoutId: string, changes: Body): WorkoutInterface | undefined {
    try {
      const indexForUpdate = DB.workouts.findIndex(
        (workout) => workout.id === workoutId
      )
      if (indexForUpdate === -1) {
        return undefined
      }
      const updatedWorkout = {
        ...DB.workouts[indexForUpdate],
        ...changes,
        updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
      }
      DB.workouts[indexForUpdate] = updatedWorkout
      workout.saveToDatabase(DB)
      return updatedWorkout
    } catch (error: any) {
      throw new CodeError({
        code: error.code !== undefined ? error.code : 500,
        message: error.message !== undefined ? error.message : 500
      })
    }
  }

  deleteOneWorkout (workoutId: string): void {
    try {
      const indexForDeletion = DB.workouts.findIndex(
        (workout) => workout.id === workoutId
      )
      if (indexForDeletion === -1) {
        throw new CodeError({
          code: 400,
          message: `Can't find workout with the id '${workoutId}'`
        })
      }
      DB.workouts.splice(indexForDeletion, 1)
      workout.saveToDatabase(DB)
    } catch (error: any) {
      throw new CodeError({
        code: error.code !== undefined ? error.code : 500,
        message: error.message !== undefined ? error.message : 500
      })
    }
  }
}
