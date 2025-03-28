import { ReactNode } from 'react'

import { cn } from '@/utils/cn'

interface Props {
  children: ReactNode
  className?: string
}

export const Container = ({ children, className }: Props) => {
  return (
    <div className={cn('mx-auto max-w-[1560px] px-2.5', className)}>
      {children}
    </div>
  )
}
