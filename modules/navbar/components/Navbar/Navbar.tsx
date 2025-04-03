import { auth } from '@/auth'
import { Logo } from '@/modules/navbar/components/Logo/Logo'
import { MobileNavigation } from '@/modules/navbar/components/MobileNavigation/MobileNavigation'
import NavLinks from '@/modules/navbar/components/NavLinks/NavLinks'
import { Theme } from '@/modules/navbar/components/Theme/Theme'
import { UserAvatar } from '@/ui/UserAvatar/UserAvatar'

export const Navbar = async () => {
  const session = await auth()
  console.log('session', session)

  return (
    <header className='flex-between background-light900_dark200 shadow-light100_dark200 sticky z-50 w-full p-6'>
      <nav className='flex-between w-full'>
        <Logo />
        <NavLinks userId={session?.user?.id} />
        <Theme />
        {session?.user?.id && (
          <UserAvatar
            name={session.user.name!}
            imageUrl={session.user?.image}
            userId={session.user.id}
          />
        )}
        <MobileNavigation />
      </nav>
    </header>
  )
}
