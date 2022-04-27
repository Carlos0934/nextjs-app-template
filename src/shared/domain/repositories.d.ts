type NonNullable<T> = {
  [K in keyof T]-?: NonNullable<T[K]>
}
export type Filter<T> = NonNullable<T>

export interface Repository<T extends Entity> {
  findAll(filter?: Filter<T>): Promise<T[]>
  findById(id: string): Promise<T | null>
  save(entity: T): Promise<T>
  update(entity: T): Promise<T>
  delete(id: string): Promise<void>
}
