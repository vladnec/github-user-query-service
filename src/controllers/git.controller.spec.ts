import { User } from '../interfaces/User'
import { GitService } from '../services/git.service'
import { Request, Response } from 'express'
import { generateUsers } from '../utils/test-utils'
import { HttpStatusCode } from '../interfaces/axios/HttpStatusCode'
import * as gitController from './git.controller'

describe('gitController' , () => {
  const gitService: GitService = GitService.getInstance()

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      // given
      const users: User[] = generateUsers()
      const request = {
        params: {
          language: 'javascript'
        }
      } as unknown as Request

      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      } as unknown as Response;

      const gitServiceMockSpy = jest.spyOn(gitService, 'getAllUsersByProgrammingLanguage').mockImplementation(() => Promise.resolve(users))

      // when
      await gitController.getUsers(request, mockResponse)

      // then
      expect(gitServiceMockSpy.mock.calls.length).toBe(1)
      expect(gitServiceMockSpy.mock.calls[0][0]).toBe('javascript')
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.OK)
      expect(mockResponse.send).toHaveBeenCalledWith(users)
    })
    it('should throw error', async () => {
      // given
      const expectedResponse = 'Error occured due to...';
      const request = {
        params: {
          language: 'javascript'
        }
      } as unknown as Request

      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      } as unknown as Response;

      jest.spyOn(gitService, 'getAllUsersByProgrammingLanguage').mockImplementationOnce(() => Promise.reject(expectedResponse))

      // when
      try {
        await gitController.getUsers(request, mockResponse)
      } catch (error) {
        // then
        expect(error.message).toMatch(expectedResponse)
        expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.InternalServerError)
      }
    })
  })
})
