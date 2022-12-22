import express from 'express'
import { getUsers } from '../controllers/git.controller'

const router = express.Router()

router.get('/users/:language', getUsers)

export { router }
