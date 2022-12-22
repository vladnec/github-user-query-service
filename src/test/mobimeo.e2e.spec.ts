import request from 'supertest'
import { createServer } from '../config/express'
import { HttpStatusCode } from '../interfaces/axios/HttpStatusCode'
import { User } from '../interfaces/User'

it('should return list of users', async () => {
  // given
  const app = createServer()

  // when
  const response = await request(app).get('/git/users/javascript')
  const users: User[] = response.body;

  // then
  expect(response.statusCode).toBe(HttpStatusCode.OK)
  expect(users.length).toBe(30)
  expect(users[0].name).toBeDefined()
  expect(users[0].login).toBeDefined()
  expect(users[0].followers).toBeDefined()
  expect(users[0].avatar_url).toBeDefined()
})
