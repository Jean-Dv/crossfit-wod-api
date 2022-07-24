import { WorkoutService } from './service'
import { WorkoutRequest } from './types'

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

  createNewWorkout (NewWorkout: WorkoutRequest): string {
    const createdWorkout = workoutService.createNewWorkout()
    return 'Create a new workout'
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
