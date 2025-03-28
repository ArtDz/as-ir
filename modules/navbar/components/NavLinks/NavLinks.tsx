'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Routes from '@/constants/routes'
import { navigationLinks } from '@/modules/navbar/constants'
import { SheetClose } from '@/ui/shadcn/sheet'
import { cn } from '@/utils/cn'

const NavLinks = ({
  isMobileNav = false,
}: {
  isMobileNav?: boolean
  userId?: string
}) => {
  const pathname = usePathname()
  const userId = '1'

  return (
    <>
      {navigationLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route

        if (item.route === '/profile') {
          if (userId) item.route = Routes.Profile(userId)
          else return null
        }

        const LinkComponent = (
          <Link
            href={item.route}
            key={item.label}
            className={cn(
              isActive
                ? 'primary-gradient rounded-lg text-light-900'
                : 'text-dark300_light900',
              'flex items-center justify-start gap-4 bg-transparent p-4',
            )}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn({ 'invert-colors': !isActive })}
            />
            <p
              className={cn(
                isActive ? 'base-bold' : 'base-medium',
                !isMobileNav && 'max-lg:hidden',
              )}
            >
              {item.label}
            </p>
          </Link>
        )

        return isMobileNav ? (
          <SheetClose asChild key={item.route}>
            {LinkComponent}
          </SheetClose>
        ) : (
          LinkComponent
        )
      })}
    </>
  )
}

export default NavLinks
