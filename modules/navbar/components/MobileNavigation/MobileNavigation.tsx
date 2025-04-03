import { LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { auth, signOut } from '@/auth'
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

export const MobileNavigation = async () => {
  const session = await auth()
  const userId = session?.user?.id

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
            <NavLinks userId={userId} isMobileNav />
          </SheetClose>

          <div className='flex flex-col gap-3'>
            {userId ? (
              <SheetClose asChild>
                <form
                  action={async () => {
                    'use server'

                    await signOut()
                    //   Todo после выхода из аккаунта, не происходит обновление ссылок в navbar и mobileNavigation - а именно Мой Аккаунт.
                  }}
                >
                  <Button
                    type='submit'
                    className='base-medium w-fit !bg-transparent px-4 py-3'
                  >
                    <LogOut className='size-5 text-black dark:text-white' />
                    <span className='text-dark300_light900'>Выйти</span>
                  </Button>
                </form>
              </SheetClose>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
