import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateService } from '../authenticate'

export function makeAuthenticateService() {
  const usersRepository = new PrismaOrgsRepository()
  const authenticateService = new AuthenticateService(usersRepository)

  return authenticateService
}
