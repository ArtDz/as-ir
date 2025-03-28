import Image from 'next/image'
import Link from 'next/link'

import { MobileNavigation } from '@/modules/navbar/components/MobileNavigation/MobileNavigation'
import { Theme } from '@/modules/navbar/components/Theme/Theme'
import Logo from '@/public/images/logo.webp'

export const Navbar = () => {
  return (
    <header className='flex-between background-light900_dark200 shadow-light100_dark200 sticky z-50 w-full p-6'>
      <nav className='flex-between w-full'>
        <Link className='flex items-center gap-5' href='/'>
          <Image src={Logo} alt='logo' />
          <span className='primary-text-gradient'>AS-IR</span>
        </Link>

        <ul className='flex-between gap-5'>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
        </ul>

        <p>Search Icon</p>

        <Theme />

        <MobileNavigation />
      </nav>
    </header>
  )
}
