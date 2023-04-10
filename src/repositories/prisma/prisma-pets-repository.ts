import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async findManyForAdoption(orgsId: string[]) {
    const pets = await prisma.pet.findMany({
      where: {
        org_id: {
          in: orgsId,
        },
      },
    })

    return pets
  }

  async getByIdForAdoption(id: string) {
    const pet = await prisma.pet.findFirst({
      where: {
        id,
        adopted_at: null,
      },
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })

    return pet
  }
}
