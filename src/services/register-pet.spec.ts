import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { OrgNotFoundError } from './errors/org-not-found-error'
import { RegisterPetService } from './register-pet'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let service: RegisterPetService

describe('Register Pet Service', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    service = new RegisterPetService(petsRepository, orgsRepository)

    await orgsRepository.create({
      id: 'org-01',
      name: 'org1',
      email: 'org1@example.com',
      cep: '1',
      city: 'city',
      phone: '11999999999',
      password: '123',
    })
  })

  it('should be able to register a pet', async () => {
    const { pet } = await service.execute({
      name: 'pet1',
      age: 1,
      energy: 4,
      independence: 'LOW',
      size: 'SMALL',
      orgId: 'org-01',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to register a pet for a non-existent organization', async () => {
    await expect(() =>
      service.execute({
        name: 'pet1',
        age: 1,
        energy: 4,
        independence: 'LOW',
        size: 'SMALL',
        orgId: 'org-02',
      }),
    ).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
