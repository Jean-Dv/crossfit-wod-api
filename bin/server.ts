import express, { Application } from 'express'
import log4js, { Log4js } from 'log4js'

import { homeRouter } from '../api/home/router'
import { workoutRouter } from '../api/workout/router'
import { swaggerDocs } from '../config/swagger'

export class Server {
  public logger!: any

  readonly app!: Application
  readonly routePrefix!: string

  private port!: string | number
  private log!: Log4js
  private listen: any

  private static _instance: Server

  private constructor () {
    this.app = express()
    this.routePrefix = '/api/v1'
    this.config()
    this.middlewares()
    this.routes()
  }

  static getInstance (): Server {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (this._instance) {
      return this._instance
    }
    this._instance = new Server()
    return this._instance
  }

  private config (): void {
    this.port = (process.env.PORT != null ? process.env.PORT : 8080)
    this.log = log4js
    this.log.configure('./config/log4js.json')
    this.logger = this.log.getLogger('server')
  }

  private middlewares (): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
  }

  private routes (): void {
    this.app.use(`${this.routePrefix}/ping`, homeRouter)
    this.app.use(`${this.routePrefix}/workouts`, workoutRouter)
  }

  start (): void {
    if (process.env.NODE_ENV !== 'test') {
      this.listen = this.app.listen(this.port, () => {
        this.logger.info(`[*] Server is running on port ${this.port}...`)
      })
      swaggerDocs(this.app, this.port)
    }
  }

  close (): void {
    this.listen.close()
  }
}
