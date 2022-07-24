import { v4 } from 'uuid'
import { WorkoutService } from './service'
import { NewWorkout, WorkoutRequest } from './types'

const workoutService = new WorkoutService()

export class WorkoutController {
  getAllWorkouts (): object {
    const allWorkouts = workoutService.getAllWorkouts()
    return allWorkouts
  }

  getOneWorkout (): string {
    const workout = workoutService.getOneWorkout()
    return 'Get an existing workout'
  }

  createNewWorkout (newWorkout: WorkoutRequest): NewWorkout | string {
    const workoutToInsert = {
      id: v4(),
      ...newWorkout,
      createdAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
      updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
    }
    const createdWorkout = workoutService.createNewWorkout(workoutToInsert)
    return createdWorkout
  }

  updateOneWorkout (): string {
    const updatedWorkout = workoutService.updateOneWorkout()
    return 'Update an existing workout'
  }

  deleteOneWorkout (): string {
    workoutService.deleteOneWorkout()
    return 'Delete an existing workout'
  }
}
