import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  findManyForAdoption(orgsId: string[]): Promise<Pet[]>
  getByIdForAdoption(id: string): Promise<Pet | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
