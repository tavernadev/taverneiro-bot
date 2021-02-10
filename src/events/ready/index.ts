import { Client } from 'discord.js'
import { promisify } from 'util'

import type { CachedInvites } from '../../server'

const wait = promisify(setTimeout)

export default async function (client: Client, cachedInvites: CachedInvites) {
  await wait(1000)

  client.guilds.cache.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      cachedInvites[g.id] = guildInvites
    })
  })
}
