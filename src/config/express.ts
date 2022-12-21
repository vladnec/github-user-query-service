import express from 'express'
import cors from 'cors'
import { router as routes } from '../routes'
import { setHeaders } from '../middleware/middlewares'

const createServer = (): express.Application => {
  const app = express()
  app.use(express.json())
  app.use(cors())
  app.use(setHeaders)
  app.use('/github_api', routes);
  app.get('/', (_req, res) => {
    res.send('Working')
  })

  return app
}

export { createServer }
