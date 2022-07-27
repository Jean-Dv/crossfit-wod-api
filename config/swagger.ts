import { Application, Response } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import { routePrefix, logger } from '../app'

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Crossfit WOD API', version: '1.0.0' }
  },
  apis: ['./api/workout/router.ts', './services/database/Workout.ts']
}

const swaggerSpec = swaggerJSDoc(options)

export const swaggerDocs = (app: Application, port: string | number): void => {
  app.use(`${routePrefix}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.get(`${routePrefix}/docs.json`, (_req, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
  logger.info(`Version 1 Docs are available on http://localhost:${port}${routePrefix}/docs`)
}
