import express from 'express'
import cors from 'cors'
import { router as routes } from '../routes/git.routes'
import { setHeaders } from '../middleware/middlewares'

const createServer = (): express.Application => {
  const app = express()
  app.use(express.json())
  app.use(cors())
  app.use(setHeaders)
  app.use('/git', routes);

  return app
}

export { createServer }
