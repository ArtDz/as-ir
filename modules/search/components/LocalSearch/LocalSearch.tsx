'use client'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import SearchIcon from '@/public/icons/search.svg'
import { Input } from '@/ui/shadcn/input'
import { formUrlQuery, removeKeysFromUrlQuery } from '@/utils/url'

interface Props {
  route: string
  imgSrc?: string
  placeholder?: string
  className?: string
}

export const LocalSearch = ({
  route,
  imgSrc = SearchIcon,
  placeholder = 'Поиск...',
  className,
}: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || ''
  const [searchQuery, setSearchQuery] = useState(query)

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: searchQuery,
        })

        router.push(newUrl, { scroll: false })
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ['query'],
          })
          router.push(newUrl, { scroll: false })
        }
      }
    }, 400)
    return () => clearTimeout(delayDebounceFn)
  }, [router, searchParams, searchQuery, route, pathname])

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${className}`}
    >
      <Image src={imgSrc} alt='search icon' width={24} height={24} />
      <Input
        type='text'
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='no-focus paragraph-regular placeholder text-dark400_light700 border-none shadow-none outline-none'
      />
    </div>
  )
}
