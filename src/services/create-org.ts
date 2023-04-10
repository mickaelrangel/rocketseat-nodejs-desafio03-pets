import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { RequiredFieldsOrgError } from './errors/required-fields-org-error'

interface CreateOrgServiceRequest {
  name: string
  email: string
  cep: string
  city: string
  phone: string
  password: string
}

interface CreateOrgServiceResponse {
  org: Org
}

export class CreateOrgService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    cep,
    city,
    phone,
    password,
  }: CreateOrgServiceRequest): Promise<CreateOrgServiceResponse> {
    if (!city || !phone) {
      throw new RequiredFieldsOrgError()
    }

    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      cep,
      city,
      phone,
      password: password_hash,
    })

    return { org }
  }
}
