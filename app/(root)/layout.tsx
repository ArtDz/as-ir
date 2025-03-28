import { FC, PropsWithChildren } from 'react'

import { Navbar } from '@/modules/navbar/components'
import { AsideTags } from '@/modules/tags/components'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className='relative'>
      <Navbar />
      {children}
      <AsideTags />
    </main>
  )
}

export default Layout
