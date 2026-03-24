// Stacked avatars for live viewers.
import { USERS } from '../data/users'

export function AvatarStack({ ids }: { ids: string[] }) {
  const avatars = USERS.filter((user) => ids.includes(user.id))
  return (
    <div className="avatar-stack">
      {avatars.map((user) => (
        <div
          key={user.id}
          className="avatar"
          style={{ backgroundColor: user.color }}
          title={user.name}
        >
          {user.initials}
        </div>
      ))}
    </div>
  )
}
