import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { GetOrgProfileService } from './get-org-profile'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { OrgNotFoundError } from './errors/org-not-found-error'

let repository: InMemoryOrgsRepository
let service: GetOrgProfileService

describe('Get Org Profile Service', () => {
  beforeEach(() => {
    repository = new InMemoryOrgsRepository()
    service = new GetOrgProfileService(repository)
  })

  it('should be able to get org profile', async () => {
    const orgCreated = await repository.create({
      name: 'org1',
      email: 'org1@example.com',
      cep: '1',
      city: 'city',
      phone: '',
      password: await hash('123', 6),
    })

    const { org } = await service.execute({
      orgId: orgCreated.id,
    })

    expect(org.id).toEqual(expect.any(String))
    expect(org.name).toEqual('org1')
  })

  it('should not be able to get org profile with wrong id', async () => {
    await expect(() =>
      service.execute({
        orgId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
