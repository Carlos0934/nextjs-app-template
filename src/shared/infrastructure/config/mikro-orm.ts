import { MikroORM, Options } from '@mikro-orm/core'

import { User } from '../models/user'
import { defaultEntities } from '@next-auth/mikro-orm-adapter'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'

const { Account, Session, VerificationToken } = defaultEntities

export const config: Options<PostgreSqlDriver> = {
  entities: [User, Account, Session, VerificationToken],
  host: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  type: 'postgresql',
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  port: parseInt(process.env.DB_PORT || '-1'),
  debug: process.env.NODE_ENV !== 'production',
}

export default config

let orm: MikroORM<PostgreSqlDriver> | null = null

export const createORM = async () => orm || (orm = await MikroORM.init(config))

export const createEntityManager = async () => {
  const orm = await createORM()

  return orm.em.fork()
}

export const getEntityManager = () => {
  if (!orm) throw new Error('ORM is not initialized')

  return orm.em.fork()
}
