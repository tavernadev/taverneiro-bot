import type { GuildMember } from 'discord.js'
import type { CachedInvites } from 'server'

import InviteRoles from '../../invite-roles'

export default function (member: GuildMember, cachedInvites: CachedInvites) {
  member.guild.fetchInvites().then(guildInvites => {
    const guildCachedInvites = cachedInvites[member.guild.id]
    cachedInvites[member.guild.id] = guildInvites

    const usedInvite = guildInvites.find((invite) => {
      if (!invite.uses) return false

      const cachedInvite = guildCachedInvites.get(invite.code)

      if (!cachedInvite || !cachedInvite.uses) return false

      return cachedInvite.uses < invite.uses
    })

    if (!usedInvite) return

    InviteRoles[usedInvite.code].forEach(role => {
      member.roles.add(role)
    })
  })
}
