import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { describe, beforeEach, expect, it } from 'vitest'
import { GetPetDetailsService } from './get-pet-details'
import { PetNotFoundError } from './errors/pet-not-found-error'

let repository: InMemoryPetsRepository
let service: GetPetDetailsService

describe('Get Pet Details Service', () => {
  beforeEach(() => {
    repository = new InMemoryPetsRepository()
    service = new GetPetDetailsService(repository)
  })

  it('should be able to get pet details', async () => {
    const createdPet = await repository.create({
      name: 'name',
      age: 1,
      size: 'SMALL',
      org_id: 'org1',
    })

    const { pet } = await service.execute({ petId: createdPet.id })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('name')
  })

  it('should not be able to get details pet that was adopted', async () => {
    const createdPet = await repository.create({
      name: 'name',
      age: 1,
      size: 'SMALL',
      adopted_at: new Date(),
      org_id: 'org1',
    })

    await expect(() =>
      service.execute({
        petId: createdPet.id,
      }),
    ).rejects.toBeInstanceOf(PetNotFoundError)
  })

  it('should not be able to get pet details with wrong id', async () => {
    await expect(() =>
      service.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(PetNotFoundError)
  })
})
