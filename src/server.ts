import { Client } from 'discord.js'

import onGuildMemberAdd from './events/guild-member-add'
import onReady from './events/ready'

import type { Collection, Invite } from 'discord.js'

require('dotenv').config()

const { TOKEN } = process.env
const client = new Client()

export type CachedInvites = Record<string, Collection<string, Invite>>
export const cachedInvites: CachedInvites = {}

client.on('ready', () => onReady(client, cachedInvites))
client.on('guildMemberAdd', member => onGuildMemberAdd(member, cachedInvites))

client.login(TOKEN)
