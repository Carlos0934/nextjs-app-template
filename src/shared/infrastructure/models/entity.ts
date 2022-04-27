import { PrimaryKey } from '@mikro-orm/core'
import { Entity as EntityInterface } from '@shared/domain/models'
import { randomUUID } from 'crypto'

export class Entity implements EntityInterface {
  @PrimaryKey()
  id: string = randomUUID()
}
