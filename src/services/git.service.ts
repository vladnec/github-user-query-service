import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import { BaseUser, User } from '../interfaces/User'
import { ErrorMessages } from '../utils/errorMessages'

export class GitService {
  private static instance: GitService
  private axiosInstance: AxiosInstance
  private readonly accessToken = `token ${process.env.GITHUB_ACCESS_TOKEN}`
  private ROOT_URL = 'https://api.github.com/'
  constructor() {
    this.axiosInstance = axios.create()
  }

  private getHeaders = () => ({
    Authorization: this.accessToken
  })

  public static getInstance(): GitService {
    if (!GitService.instance) {
      GitService.instance = new GitService();
    }

    return GitService.instance;
  }

  public getAllUsersByProgrammingLanguage = async (programmingLanguage: string): Promise<User[]> => {
    try {
      const users = await this.getUsersByProgrammingLanguage(programmingLanguage)
      const userList: User[] = []
      for (const user of users) {
        const response = await this.getUserByLogin(user.login)
        userList.push(response)
      }
      return userList
    } catch (error) {
      throw new Error(`${ErrorMessages.ERROR_USERS}. Error message: ${error.message}`)
    }
  }

  public getUsersByProgrammingLanguage = async (programmingLanguage: string): Promise<BaseUser[]> => {
    const axiosConfig: AxiosRequestConfig = {
      url: `${this.ROOT_URL}search/users?q=language:${programmingLanguage}`,
      method: 'GET',
      headers: this.getHeaders()
    }
    return this.axiosInstance(axiosConfig)
      .then((response)=> response.data.items)
      .catch((error: AxiosError) => {
        throw new Error(`${ErrorMessages.ERROR_USERS_BY_PROGRAMMING_LANGUAGE}. Error message: ${error.message}`)
      })
  }

  public getUserByLogin = async (login: string): Promise<User> => {
    const axiosConfig: AxiosRequestConfig = {
      url: `${this.ROOT_URL}users/${login}`,
      method: 'GET',
      headers: this.getHeaders()
    }
    return this.axiosInstance(axiosConfig)
      .then((response) => ({
          login,
          name: response.data.name,
          avatar_url: response.data.avatar_url,
          followers: response.data.followers,
        })
      )
      .catch((error: AxiosError) => {
        throw new Error(`${ErrorMessages.ERROR_USERS_BY_LOGIN}. Error message: ${error.message}`)
      })
  }
}
