import { CodeErrorHandling } from './types'
export class CodeError extends Error {
  public code

  constructor (objectError: CodeErrorHandling) {
    super(objectError.message)
    this.code = objectError.code
  }
}
