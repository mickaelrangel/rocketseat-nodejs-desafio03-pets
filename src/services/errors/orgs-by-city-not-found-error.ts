export class OrgsByCityNotFoundError extends Error {
  constructor() {
    super('Orgs not found for the informed city.')
  }
}
