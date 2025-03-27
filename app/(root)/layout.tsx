import { FC, PropsWithChildren } from 'react'

import { Header } from '@/modules/header/components'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  )
}

export default Layout
