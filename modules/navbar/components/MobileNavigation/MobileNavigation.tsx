import Image from 'next/image'
import Link from 'next/link'

import Routes from '@/constants/routes'
import NavLinks from '@/modules/navbar/components/NavLinks/NavLinks'
import { Button } from '@/ui/shadcn/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/ui/shadcn/sheet'

export const MobileNavigation = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src='/icons/hamburger.svg'
          alt='Навигация'
          width={36}
          height={36}
          className='invert-colors sm:hidden'
        />
      </SheetTrigger>
      <SheetContent
        className='background-light900_dark200 border-none'
        side='left'
      >
        <SheetHeader>
          <SheetTitle className='hidden'>Navigation</SheetTitle>
          <Link href='/' className='flex items-center gap-1'>
            <Image src='/images/logo.webp' width={33} height={33} alt='Logo' />

            <p className='h2-bold primary-text-gradient dark:text-light-900'>
              АС-ИР
            </p>
          </Link>
        </SheetHeader>
        <div className='no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto'>
          <SheetClose asChild>
            <section className='flex flex-col gap-6 pt-16'>
              <NavLinks isMobileNav />
            </section>
          </SheetClose>

          <div className='flex flex-col gap-3'>
            <SheetClose asChild>
              <Link href={Routes.SignIn}>
                <Button className='small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'>
                  <span className='primary-text-gradient'>Войти</span>
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href={Routes.SignUp}>
                <Button className='small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none'>
                  Регистрация
                </Button>
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
