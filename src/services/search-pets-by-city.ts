import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { OrgsByCityNotFoundError } from './errors/orgs-by-city-not-found-error'
import { ParamCityNotInformedError } from './errors/param-city-not-informed-error'

interface SearchPetsByCityRequest {
  query: string
}

interface SearchPetsByCityResponse {
  pets: Pet[]
}

export class SearchPetsByCityService {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    query,
  }: SearchPetsByCityRequest): Promise<SearchPetsByCityResponse> {
    if (!query) {
      throw new ParamCityNotInformedError()
    }

    const orgs = await this.orgsRepository.findManyByCity(query)

    if (orgs.length === 0) {
      throw new OrgsByCityNotFoundError()
    }

    const orgsId = orgs.map((item) => item.id)

    const pets = await this.petsRepository.findManyForAdoption(orgsId)

    return { pets }
  }
}
