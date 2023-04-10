import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPetsByCityService } from './search-pets-by-city'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { OrgsByCityNotFoundError } from './errors/orgs-by-city-not-found-error'
import { ParamCityNotInformedError } from './errors/param-city-not-informed-error'

let orgsRepository: OrgsRepository
let petsRepository: PetsRepository
let service: SearchPetsByCityService

describe('Search Pets by City Service', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    service = new SearchPetsByCityService(orgsRepository, petsRepository)

    createOrgs()
  })

  it('should be able to search for unadopted pets by city', async () => {
    await petsRepository.create({
      name: 'dog1',
      age: 1,
      size: 'LARGE',
      org_id: 'org-01',
    })

    await petsRepository.create({
      name: 'dog2',
      age: 1,
      size: 'LARGE',
      adopted_at: new Date(),
      org_id: 'org-01',
    })

    await petsRepository.create({
      name: 'dog3',
      age: 1,
      size: 'LARGE',
      org_id: 'org-02',
    })

    await petsRepository.create({
      name: 'dog4',
      age: 1,
      size: 'LARGE',
      org_id: 'org-03',
    })

    const { pets } = await service.execute({
      query: 'city1',
    })

    // dog1, dog3
    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'dog1' }),
      expect.objectContaining({ name: 'dog3' }),
    ])
  })

  it('should not be able to search if city it not informed', async () => {
    await expect(
      service.execute({
        query: '',
      }),
    ).rejects.toBeInstanceOf(ParamCityNotInformedError)
  })

  it('should not be able to search pets for a non-existent orgs', async () => {
    await expect(
      service.execute({
        query: 'city3',
      }),
    ).rejects.toBeInstanceOf(OrgsByCityNotFoundError)
  })
})

async function createOrgs() {
  await orgsRepository.create({
    id: 'org-01',
    name: 'org1',
    email: 'org1@example.com',
    cep: '1',
    city: 'city1',
    phone: '11999999999',
    password: '123',
  })

  await orgsRepository.create({
    id: 'org-02',
    name: 'org2',
    email: 'org2@example.com',
    cep: '2',
    city: 'city1',
    phone: '11999999999',
    password: '123',
  })

  await orgsRepository.create({
    id: 'org-03',
    name: 'org3',
    email: 'org3@example.com',
    cep: '3',
    city: 'city2',
    phone: '11999999999',
    password: '123',
  })
}
