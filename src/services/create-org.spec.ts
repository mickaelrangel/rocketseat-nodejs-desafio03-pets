import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { compare } from 'bcryptjs'
import { describe, it, beforeEach, expect } from 'vitest'
import { CreateOrgService } from './create-org'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { RequiredFieldsOrgError } from './errors/required-fields-org-error'

let repository: InMemoryOrgsRepository
let service: CreateOrgService

describe('Create Org Service', () => {
  beforeEach(() => {
    repository = new InMemoryOrgsRepository()
    service = new CreateOrgService(repository)
  })

  it('should be able te create a organization', async () => {
    const { org } = await service.execute({
      name: 'org1',
      email: 'org1@example.com',
      cep: '1',
      city: 'city',
      phone: '11999999999',
      password: '123',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to create org with no city', async () => {
    await expect(() =>
      service.execute({
        name: 'org1',
        email: 'org1@example.com',
        cep: '1',
        city: '',
        phone: '11999999999',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(RequiredFieldsOrgError)
  })

  it('should not be able to create org with no phone', async () => {
    await expect(() =>
      service.execute({
        name: 'org1',
        email: 'org1@example.com',
        cep: '1',
        city: 'city',
        phone: '',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(RequiredFieldsOrgError)
  })

  it('should hash organization password upon creation', async () => {
    const { org } = await service.execute({
      name: 'org1',
      email: 'org1@example.com',
      cep: '1',
      city: 'city',
      phone: '11999999999',
      password: '123',
    })

    const isPasswordCorrectlyHashed = await compare('123', org.password)

    expect(isPasswordCorrectlyHashed).toBeTruthy()
  })

  it('should not be able to create org with the same email twice', async () => {
    const email = 'org1@example.com'

    await service.execute({
      name: 'org1',
      email,
      cep: '1',
      city: 'city',
      phone: '11999999999',
      password: '123',
    })

    await expect(() =>
      service.execute({
        name: 'org1',
        email,
        cep: '1',
        city: 'city',
        phone: '11999999999',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
