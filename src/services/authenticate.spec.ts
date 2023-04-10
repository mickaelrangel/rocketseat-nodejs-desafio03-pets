import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateService } from './authenticate'

let respository: InMemoryOrgsRepository
let service: AuthenticateService

describe('Authenticate Service', () => {
  beforeEach(() => {
    respository = new InMemoryOrgsRepository()
    service = new AuthenticateService(respository)
  })

  it('should be able to authenticate', async () => {
    await respository.create({
      name: 'name',
      email: 'email@test.com',
      cep: '1',
      city: ' bsb',
      phone: '1',
      password: await hash('123456', 6),
    })

    const { org } = await service.execute({
      email: 'email@test.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with non-existent email', async () => {
    await expect(() =>
      service.execute({
        email: 'email@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await respository.create({
      name: 'name',
      email: 'email@test.com',
      cep: '1',
      city: ' bsb',
      phone: '1',
      password: await hash('123456', 6),
    })

    await expect(() =>
      service.execute({
        email: 'email@test.com',
        password: '111222',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
