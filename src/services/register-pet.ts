import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Independence, Size, Pet } from '@prisma/client'
import { OrgNotFoundError } from './errors/org-not-found-error'

interface RegisterPetServiceRequest {
  name: string
  age: number
  energy?: number
  independence?: Independence
  size: Size
  orgId: string
}

interface RegisterPetServiceResponse {
  pet: Pet
}

export class RegisterPetService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    age,
    energy,
    independence,
    size,
    orgId,
  }: RegisterPetServiceRequest): Promise<RegisterPetServiceResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new OrgNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      age,
      energy,
      independence,
      size,
      org_id: org.id,
    })

    return { pet }
  }
}
