export interface NewWorkout {
  id: string
  name: string
  mode: string
  equipment: string[]
  exercises: string[]
  trainerTips: string[]
  createdAt: string
  updatedAt: string
}

export interface WorkoutRequest {
  name: string
  mode: string
  equipment: string[]
  exercises: string[]
  trainerTips: string[]
}