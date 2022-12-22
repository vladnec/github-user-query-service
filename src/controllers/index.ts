import GitService from '../services/GitService'
import { Request, Response } from 'express'
import { User } from '../interfaces/User'
import { HttpStatusCode } from '../interfaces/axios/HttpStatusCode'

const getUsers = async (req: Request, res: Response) => {
  const gitService = new GitService()
  const userList: User[] = []
  try {
    const users = await gitService.getUsersByProgrammingLanguage(req.params.language)
    for (const user of users) {
      const response = await gitService.getUserDataByLogin(user.login)
      userList.push(response)
    }
    return res.status(HttpStatusCode.OK).send(userList)
  } catch (e) {
    return res.status(HttpStatusCode.InternalServerError).json(e.message)
  }
}

export { getUsers }
