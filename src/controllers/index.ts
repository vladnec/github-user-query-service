import GitService from '../services/GitService'
import { Request, Response } from 'express'
import { User } from '../interfaces/User'

const getUsers = async (req: Request, res: Response) => {
  const gitService = new GitService()
  const userList: User[] = []
  try {
    const userLogins = await gitService.getUsersIdByProgrammingLanguage(req.params.language)
    for (const userLogin of userLogins) {
      const user = await gitService.getUserDataByLogin(userLogin.login)
      userList.push(user)
    }
    return res.send(
      userList
    )
  } catch (e) {
    console.log(e)
    return ({
      statusCode: 500,
      message: e.message
    })
  }
}

export { getUsers }
