import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetsByCityService } from '../search-pets-by-city'

export function makeSearchPetsByCityService() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()

  const service = new SearchPetsByCityService(orgsRepository, petsRepository)

  return service
}
