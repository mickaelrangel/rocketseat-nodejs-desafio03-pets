export class RequiredFieldsOrgError extends Error {
  constructor() {
    super('Required org fields missing: City, Phone.')
  }
}
