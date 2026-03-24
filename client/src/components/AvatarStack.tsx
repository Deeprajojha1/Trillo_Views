// Stacked avatars for live viewers.
import { USERS } from '../data/users'

export function AvatarStack({ ids }: { ids: string[] }) {
  const avatars = USERS.filter((user) => ids.includes(user.id))
  return (
    <div className="flex -space-x-2">
      {avatars.map((user) => (
        <div
          key={user.id}
          className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#f4f1ea] text-[12px] font-semibold text-white"
          style={{ backgroundColor: user.color }}
          title={user.name}
        >
          {user.initials}
        </div>
      ))}
    </div>
  )
}
