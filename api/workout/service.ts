import { Workout } from '../../services/database/Workout'
const workout = new Workout()
export class WorkoutService {
  getAllWorkouts (): object {
    const allWorkouts = workout.getAllWorkouts()
    return allWorkouts
  }

  getOneWorkout (): string {
    return ''
  }

  createNewWorkout (): string {
    return ''
  }

  updateOneWorkout (): string {
    return ''
  }

  deleteOneWorkout (): string {
    return ''
  }
}
