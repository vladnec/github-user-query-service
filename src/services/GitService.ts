import axios, { AxiosRequestConfig } from 'axios'
import { User } from '../interfaces/User'
import { UserResponse } from '../interfaces/axios/UserResponse'

class GitService {

  private ROOT_URL = 'https://api.github.com/'

  public getUsersIdByProgrammingLanguage = async (programmingLanguage: string): Promise<UserResponse[]> => {
    console.log('fetching user lists by programming language:', programmingLanguage)
    const url = `${this.ROOT_URL}search/users?q=language:${programmingLanguage}`
    const options: AxiosRequestConfig = {
      url,
      method: 'GET',
      headers: {
        authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`
      }
    }
    try {
      const response = await axios(options)
      console.log(response.data, 'response')
      return response.data.items
    } catch (e) {
      throw new Error(e.message)
    }
  }

  public getUserDataByLogin = async (username: string): Promise<User> => {
    console.log('fetching user by login:', username)
    const url = `${this.ROOT_URL}users/${username}`
    const options: AxiosRequestConfig = {
      url,
      method: 'GET',
      headers: {
        authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`
      }
    }
    try {
      const response = await axios(options)
      console.log(response.data, 'response')
      return ({
        username,
        name: response.data.name,
        avatar_url: response.data.avatar_url,
        followers: response.data.followers,
      })
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

export default GitService
