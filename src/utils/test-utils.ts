import { BaseUser, User } from '../interfaces/User'

const generateUser = (loginId: string): User => ({
  login: loginId,
  avatar_url:'random_url',
  name:'Vlad Neculai',
  followers: 0
})

const generateBaseUser = (loginId: string): BaseUser => ({
  login: loginId,
  avatar_url: 'abc'
})

export const generateUsers = (): User[] => ([
  generateUser('a'),
  generateUser('b')
])

export const generateBaseUsers = (): BaseUser[] => ([
  generateBaseUser('a'),
  generateBaseUser('b')
])
