import { FC, PropsWithChildren } from 'react'

import { Navbar } from '@/modules/navbar/components'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  )
}

export default Layout
