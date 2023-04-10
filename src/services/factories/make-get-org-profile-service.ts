import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { GetOrgProfileService } from '../get-org-profile'

export function makeGetOrgProfileService() {
  const repository = new PrismaOrgsRepository()
  const service = new GetOrgProfileService(repository)

  return service
}
