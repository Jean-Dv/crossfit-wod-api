export interface WorkoutInterface {
  id: string
  name: string
  mode: string
  equipment: string[]
  exercises: string[]
  trainerTips: string[]
  createdAt: string
  updatedAt: string
}

export interface NewWorkout {
  name: string
  mode: string
  equipment: string[]
  exercises: string[]
  trainerTips: string[]
}
