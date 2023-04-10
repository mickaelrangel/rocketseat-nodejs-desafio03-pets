import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { CreateOrgService } from '../create-org'

export function makeCreateOrgService() {
  const repository = new PrismaOrgsRepository()
  const service = new CreateOrgService(repository)

  return service
}
