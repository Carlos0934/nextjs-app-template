import { EntityRepository, FilterQuery } from '@mikro-orm/core'
import { SqlEntityManager } from '@mikro-orm/postgresql'
import { NotFoundError } from '@shared/domain/errors'
import { Entity } from '@shared/domain/models'
import { Filter, Repository } from '@shared/domain/repositories'

export class MikroOrmRepository<T extends Entity> implements Repository<T> {
  constructor(
    private readonly entityClass: new () => T,
    private readonly em: SqlEntityManager,
  ) {}
  findById(id: string): Promise<T | null> {
    const result = this.em
      .createQueryBuilder<T>(this.entityClass)
      .select('*')
      .where({ id: id })
      .execute('get')
    return result
  }
  async save(entity: T): Promise<T> {
    const result = await this.em
      .createQueryBuilder<T>(this.entityClass)
      .insert(entity)
      .execute('run')
    entity.id = result.insertId
    return entity
  }
  async update(entity: T): Promise<T> {
    const result = await this.em
      .createQueryBuilder<T>(this.entityClass)
      .update(entity)
      .where({ id: entity.id })
      .execute('run')
    if (result.affectedRows === 0) {
      throw new NotFoundError('Entity not found')
    }
    const entityFound = await this.findById(entity.id)
    return entityFound!
  }
  async delete(id: string): Promise<void> {
    const result = await this.em
      .createQueryBuilder<T>(this.entityClass)
      .delete()
      .where({ id: id })
      .execute('run')
    if (result.affectedRows === 0) {
      throw new NotFoundError('Entity not found')
    }
  }

  async findAll(filter: Filter<T>): Promise<T[]> {
    const queryBuilder = this.em.createQueryBuilder<T>(this.entityClass)

    const result = await queryBuilder.select('*').where(filter).execute('all')
    return result
  }
}
