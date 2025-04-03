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
  userId,
}: {
  isMobileNav?: boolean
  userId?: string
}) => {
  const pathname = usePathname()

  return (
    <ul
      className={
        isMobileNav
          ? 'flex flex-col gap-6 pt-16'
          : 'hidden items-center justify-between gap-4 md:flex'
      }
    >
      {navigationLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route

        if (item.route === '/profile') {
          if (userId) item.route = Routes.Profile(userId)
          else return null
        }

        let LinkComponent

        if (isMobileNav) {
          LinkComponent = (
            <li key={item.label}>
              <SheetClose asChild>
                <Link
                  href={item.route}
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
                  <p className={cn(isActive ? 'base-bold' : 'base-medium')}>
                    {item.label}
                  </p>
                </Link>
              </SheetClose>
            </li>
          )
        } else {
          LinkComponent = (
            <li key={item.label}>
              <Link
                href={item.route}
                className={cn(
                  isActive
                    ? 'primary-gradient rounded-lg text-light-900'
                    : 'text-dark300_light900',
                  'flex items-center justify-start gap-2 bg-transparent px-2 py-0.5',
                )}
              >
                <p className='text-sm'>{item.label}</p>
              </Link>
            </li>
          )
        }

        return LinkComponent
      })}
    </ul>
  )
}

export default NavLinks
