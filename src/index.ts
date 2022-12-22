import { createServer } from './config/express'
import * as http from 'http'
import { AddressInfo } from 'net'
import { config } from 'dotenv'

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || '8080'

config()

const startServer = async () => {
  const app = await createServer()
  const server = http.createServer(app).listen({ host, port }, () => {
    const addressInfo = server.address() as AddressInfo
    console.log(`Server ready at http://${addressInfo.address}:${addressInfo.port}`)
  })
}

startServer()
