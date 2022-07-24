import { writeFileSync } from 'fs'
import DB from './db.json'

export class Workout {
  getAllWorkouts (): object {
    return DB.workouts
  }

  saveToDatabase (DB: object): void {
    writeFileSync('../../services/database/db.json', JSON.stringify(DB, null, 2), {
      encoding: 'utf-8'
    })
  }
}
