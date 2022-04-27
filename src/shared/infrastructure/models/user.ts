import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core'
import { defaultEntities } from '@next-auth/mikro-orm-adapter'
import { Entity as EntityModel } from './entity'

const { Account, Session } = defaultEntities

@Entity()
export class User extends EntityModel implements defaultEntities.User {
  @Property({ nullable: true })
  name?: string

  @Property({ nullable: true })
  @Unique()
  email?: string

  @Property({ type: 'Date', nullable: true })
  emailVerified: Date | null = null

  @Property({ nullable: true })
  image?: string

  @OneToMany({
    entity: () => Session,
    mappedBy: (session) => session.user,
    hidden: true,
    orphanRemoval: true,
    cascade: [Cascade.ALL],
  })
  sessions = new Collection<defaultEntities.Session>(this)

  @OneToMany({
    entity: () => Account,
    mappedBy: (account) => account.user,
    hidden: true,
    orphanRemoval: true,
    cascade: [Cascade.ALL],
  })
  accounts = new Collection<defaultEntities.Account>(this)
}
