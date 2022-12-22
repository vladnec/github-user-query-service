import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import { User } from '../interfaces/User'
import { UserResponse } from '../interfaces/axios/UserResponse'

class GitService {
  private axiosInstance: AxiosInstance
  private readonly accessToken: string
  private ROOT_URL = 'https://api.github.com/'

  constructor() {
    this.axiosInstance = axios.create()
    this.accessToken = `token ${process.env.GITHUB_ACCESS_TOKEN}`
  }

  private getHeaders = () => ({
    Authorization: this.accessToken
  })

  public getUsersByProgrammingLanguage = async (programmingLanguage: string): Promise<UserResponse[]> => {
    const axiosConfig: AxiosRequestConfig = {
      url: `${this.ROOT_URL}search/usersa?q=language:${programmingLanguage}`,
      method: 'GET',
      headers: this.getHeaders()
    }
    return this.axiosInstance(axiosConfig)
      .then((response)=> response.data.items)
      .catch((error: AxiosError) => {
        throw new Error(`Error fetching users by programming language: ${programmingLanguage}. Error message: ${error.message}`)
      })
  }

  public getUserDataByLogin = async (username: string): Promise<User> => {
    const axiosConfig: AxiosRequestConfig = {
      url: `${this.ROOT_URL}users/${username}`,
      method: 'GET',
      headers: this.getHeaders()
    }
    return this.axiosInstance(axiosConfig)
      .then((response) => ({
          username,
          name: response.data.name,
          avatar_url: response.data.avatar_url,
          followers: response.data.followers,
        })
      )
      .catch((error: AxiosError) => {
        throw new Error(`Error fetching user data by user login: ${username}. Error message: ${error.message}`)
      })
  }
}

export default GitService
