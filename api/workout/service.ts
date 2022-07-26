import { Workout } from '../../services/database/Workout'
import DB from '../../services/database/db.json'
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

  updateOneWorkout (): string {
    return ''
  }

  deleteOneWorkout (): string {
    return ''
  }
}
