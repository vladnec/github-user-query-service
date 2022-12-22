import { GitService } from '../services/git.service'
import { HttpStatusCode } from '../interfaces/axios/HttpStatusCode'
import { Request, Response } from 'express'

export const getUsers = async (req: Request, res: Response) => {
  const gitService = GitService.getInstance()
  try {
    const users = await gitService.getAllUsersByProgrammingLanguage(req.params.language)
    return res.status(HttpStatusCode.OK).send(users)
  } catch (e) {
    return res.status(HttpStatusCode.InternalServerError).json(e.message)
  }
}
