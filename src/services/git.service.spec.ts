import { GitService } from './git.service'
import { BaseUser, User } from '../interfaces/User'
import { ErrorMessages } from '../utils/errorMessages'
import { generateBaseUsers, generateUsers } from '../utils/test-utils'

describe('GitService', () => {
  const gitService: GitService = GitService.getInstance()
  afterEach(() => {
    jest.clearAllMocks();
  })
  it('should returns list of users', async () => {
    //given
    const language = 'javascript'
    const userList: BaseUser[] = generateBaseUsers()
    const users: User[] = generateUsers()


    const getUsersByProgrammingLanguageMockSpy = jest
      .spyOn(gitService, 'getUsersByProgrammingLanguage')
      .mockResolvedValue(userList)

    const getUserByLoginSpyMock = jest
      .spyOn(gitService,'getUserByLogin')
      .mockResolvedValueOnce(users[0])
      .mockResolvedValueOnce(users[1])

    // when
    const response = await gitService.getAllUsersByProgrammingLanguage(language)

    //then
    expect(getUsersByProgrammingLanguageMockSpy.mock.calls.length).toBe(1)
    expect(getUsersByProgrammingLanguageMockSpy.mock.calls[0][0]).toBe(language)
    expect(getUserByLoginSpyMock.mock.calls.length).toBe(2)
    expect(response).toEqual(users)
  })

  it('should throw error' , async () => {
    // given
    const language = 'javascript'
    const getUsersByProgrammingLanguageMockSpy = jest
      .spyOn(gitService, 'getUsersByProgrammingLanguage')
      .mockRejectedValue(new Error('Not found'))
    const getUsersByLogin = jest.spyOn(gitService, 'getUserByLogin')
    //when
    try {
      await gitService.getAllUsersByProgrammingLanguage(language)
    } catch (error) {
      //then
      expect(error.message).toBe(`${ErrorMessages.ERROR_USERS}. Error message: Not found`)
    }
    expect(getUsersByProgrammingLanguageMockSpy.mock.calls.length).toBe(1)
    expect(getUsersByLogin.mock.calls.length).toBe(0)
  })
})
