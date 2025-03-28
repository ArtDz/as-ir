import { Badge } from 'lucide-react'
import Link from 'next/link'

import Routes from '@/constants/routes'

interface Props {
  _id: string
  name: string
  posts: number
  showCount?: boolean
}

export const TagCard = ({ _id, name, posts, showCount }: Props) => {
  return (
    <>
      <Link
        className='subtle-medium background-light800_dark300 text-light400_light500 flex w-fit flex-row gap-2 rounded-md border-none px-4 py-2 uppercase'
        href={Routes.Tag(_id)}
      >
        <div className='flex-center space-x-2'>
          <span>{name}</span>
        </div>

        {showCount && (
          <p className='small-medium text-dark500_light700'>{posts}</p>
        )}
      </Link>
    </>
  )
}
