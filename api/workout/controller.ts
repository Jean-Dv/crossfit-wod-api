import { v4 } from 'uuid'
import { WorkoutService } from './service'
import { NewWorkout, WorkoutInterface } from './types'

const workoutService = new WorkoutService()

export class WorkoutController {
  getAllWorkouts (): object {
    const allWorkouts = workoutService.getAllWorkouts()
    return allWorkouts
  }

  getOneWorkout (workoutId: string): WorkoutInterface | string {
    const workout = workoutService.getOneWorkout(workoutId)
    return workout
  }

  createNewWorkout (newWorkout: NewWorkout): WorkoutInterface | string {
    const workoutToInsert = {
      id: v4(),
      ...newWorkout,
      createdAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
      updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
    }
    const createdWorkout = workoutService.createNewWorkout(workoutToInsert)
    return createdWorkout
  }

  updateOneWorkout (workoutId: string, changes: Body): WorkoutInterface | undefined {
    const updatedWorkout = workoutService.updateOneWorkout(workoutId, changes)
    return updatedWorkout
  }

  deleteOneWorkout (workoutId: string): void {
    workoutService.deleteOneWorkout(workoutId)
  }
}
