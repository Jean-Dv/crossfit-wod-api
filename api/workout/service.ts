import { Workout } from '../../services/database/Workout'
import DB from '../../db.json'
import { WorkoutInterface } from './types'
const workout = new Workout()
export class WorkoutService {
  getAllWorkouts (): object {
    const allWorkouts = workout.getAllWorkouts()
    return allWorkouts
  }

  getOneWorkout (workoutId: string): WorkoutInterface | string {
    const workout = DB.workouts.find((workout) => workout.id === workoutId)
    if (workout == null) {
      return 'Not found'
    }
    return workout
  }

  createNewWorkout (newWorkout: WorkoutInterface): WorkoutInterface | string {
    const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1
    if (isAlreadyAdded) {
      return ''
    }
    DB.workouts.push(newWorkout)
    workout.saveToDatabase(DB)
    return newWorkout
  }

  updateOneWorkout (workoutId: string, changes: Body): WorkoutInterface | undefined {
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
  }

  deleteOneWorkout (): string {
    return ''
  }
}
