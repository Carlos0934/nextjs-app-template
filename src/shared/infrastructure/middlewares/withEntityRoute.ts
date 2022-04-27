import { Entity } from '@shared/domain/models'
import { getEntityManager } from '@shared/infrastructure/config/mikro-orm'

import { EntityController } from '@shared/infrastructure/controllers/entityController'
import { MikroOrmRepository } from '@shared/infrastructure/repositories/mikroOrmRepository'
import { withOrmRoute } from './withOrmRoute'

export default function withEntityRoute(entityClass: new () => Entity) {
  return withOrmRoute(async (req, res) => {
    const em = getEntityManager()
    const repository = new MikroOrmRepository(entityClass, em)
    const entityController = new EntityController(repository)
    await entityController.attach(req, res)
  })
}
