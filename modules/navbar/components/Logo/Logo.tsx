import Image from 'next/image'
import Link from 'next/link'

import LogoImage from '@/public/images/logo.webp'

export const Logo = () => {
  return (
    <Link className='flex items-center gap-5' href='/'>
      <Image src={LogoImage} alt='logo' />
      <span className='primary-text-gradient'>AS-IR</span>
    </Link>
  )
}
