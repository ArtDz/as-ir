import { Logo } from '@/modules/navbar/components/Logo/Logo'
import { MobileNavigation } from '@/modules/navbar/components/MobileNavigation/MobileNavigation'
import NavLinks from '@/modules/navbar/components/NavLinks/NavLinks'
import { Theme } from '@/modules/navbar/components/Theme/Theme'

export const Navbar = () => {
  return (
    <header className='flex-between background-light900_dark200 shadow-light100_dark200 sticky z-50 w-full p-6'>
      <nav className='flex-between w-full'>
        <Logo />
        <NavLinks />

        <p>Search Icon</p>

        <Theme />
        <MobileNavigation />
      </nav>
    </header>
  )
}
