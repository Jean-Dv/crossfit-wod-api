import DB from './db.json'

export class Workout {
  getAllWorkouts (): object {
    return DB.workouts
  }
}
