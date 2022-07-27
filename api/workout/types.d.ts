type param = string | string[] | ParsedQs | ParsedQs[] | undefined

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

export type NewWorkout = Omit<WorkoutInterface, 'id' | 'createdAt' | 'updatedAt'>

export interface CodeErrorHandling {
  message: any
  code: number
}

export interface FilterParams {
  mode?: param
  equipment: param
}
