import { Prisma, Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findManyForAdoption(orgsId: string[]) {
    const pets: Pet[] = []

    orgsId.forEach((orgId) => {
      const petsByOrg = this.items.filter(
        (item) => item.org_id === orgId && !item.adopted_at,
      )
      pets.push(...petsByOrg)
    })

    return pets
  }

  async getByIdForAdoption(id: string) {
    const pet = this.items.find((item) => item.id === id && !item.adopted_at)

    if (!pet) {
      return null
    }

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      age: data.age,
      energy: data.energy ?? null,
      independence: data.independence ?? null,
      size: data.size,
      adopted_at: data.adopted_at ? new Date(data.adopted_at) : null,
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }
}
