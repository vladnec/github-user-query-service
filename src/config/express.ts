import express from 'express'

const createServer = (): express.Application => {
  const app = express()

  app.get('/', (_req, res) => {
    res.send('Working')
  })
  return app
}

export { createServer }
