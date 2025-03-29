'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/ui/shadcn/button'
import { cn } from '@/utils/cn'
import { formUrlQuery, removeKeysFromUrlQuery } from '@/utils/url'

const filters = [
  { name: 'Новые', value: 'newest' },
  { name: 'Популярные', value: 'popular' },
  { name: 'Обсуждаемые', value: 'most_commented' },
  { name: 'Старые', value: 'oldest' },
] as const

export const HomeFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeFilter, setActiveFilter] = useState('')

  const onFilterClick = (value: string) => {
    let newUrl = ''

    if (value === activeFilter) {
      setActiveFilter('')

      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ['filter'],
      })
    } else {
      setActiveFilter(value)

      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: value.toLowerCase(),
      })
    }

    router.push(newUrl, { scroll: false })
  }

  return (
    <div className='flex flex-wrap gap-3'>
      {filters.map((filter) => (
        <Button
          key={filter.name}
          className={cn(
            'body-medium rounded-lg px-6 py-3 capitalize shadow-none',
            activeFilter === filter.value
              ? 'bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400'
              : 'bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300',
          )}
          onClick={() => onFilterClick(filter.value)}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  )
}
