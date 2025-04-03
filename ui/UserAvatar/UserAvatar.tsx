import Image from 'next/image'
import Link from 'next/link'

import Routes from '@/constants/routes'
import { Avatar, AvatarFallback } from '@/ui/shadcn/avatar'
import { cn } from '@/utils/cn'

interface Props {
  userId: string
  name: string
  imageUrl?: string | null
  className?: string
  fallbackClassName?: string
}

export const UserAvatar = ({
  userId,
  name,
  imageUrl,
  className = 'h-9 w-9',
  fallbackClassName,
}: Props) => {
  const initials = name
    .split(' ')
    .map((word: string) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <Link href={Routes.Profile(userId)}>
      <Avatar className={className}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            width={36}
            height={36}
            quality={100}
            className='size-full rounded-full object-cover'
          />
        ) : (
          <AvatarFallback
            className={cn(
              'primary-gradient font-space-grotesk font-bold tracking-wider text-white',
              fallbackClassName,
            )}
          >
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  )
}
