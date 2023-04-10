import { PetsRepository } from '@/repositories/pets-repository'
import { PetNotFoundError } from './errors/pet-not-found-error'
import { Pet } from '@prisma/client'

interface GetPetDetailsServiceRequest {
  petId: string
}

interface GetPetDetailsServiceResponse {
  pet: Pet
}

export class GetPetDetailsService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetDetailsServiceRequest): Promise<GetPetDetailsServiceResponse> {
    const pet = await this.petsRepository.getByIdForAdoption(petId)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return { pet }
  }
}
