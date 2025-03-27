import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className='flex-between background-light900_dark200 fixed z-50 w-full p-6 shadow-light-300'>
      <nav className='flex-between w-full'>
        <Link className='flex items-center gap-5' href='/'>
          <Image src='/images/logo.webp' alt='logo' width={61} height={61} />
          <span className='gradient-text'>AS-IR</span>
        </Link>

        <ul className='flex-between gap-5'>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
        </ul>

        <p>Search Icon</p>

        <div>Theme</div>
      </nav>
    </header>
  )
}
