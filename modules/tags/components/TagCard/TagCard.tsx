import Link from 'next/link'

import Routes from '@/constants/routes'

interface Props {
  _id: string
  name: string
  posts?: number
  showCount?: boolean
  isLink?: boolean
}
const classes =
  'subtle-medium background-light800_dark300 text-light400_light500 flex w-fit flex-row gap-2 rounded-md border-none px-4 py-2 uppercase'

export const TagCard = ({ _id, name, posts, showCount, isLink }: Props) => {
  const content = (
    <div className='flex-center space-x-2'>
      <span>{name}</span>
      {showCount && (
        <p className='small-medium text-dark500_light700'>{posts}</p>
      )}
    </div>
  )

  if (isLink) {
    return (
      <Link className={classes} href={Routes.Tag(_id)}>
        {content}
      </Link>
    )
  }

  return <div className={classes}>{content}</div>
}
