import Image from 'next/image'
import Link from 'next/link'

import Routes from '@/constants/routes'
import { Button } from '@/ui/shadcn/button'

interface Props {
  _id: string
  name: string
  posts?: number
  showCount?: boolean
  isLink?: boolean
  isButton?: boolean
  remove?: boolean
  handleRemove?: VoidFunction
}
const classes =
  'subtle-medium background-light800_dark300 text-light400_light500 flex w-fit flex-row gap-2 rounded-md border-none px-4 py-2 uppercase'

export const TagCard = ({
  _id,
  name,
  posts,
  showCount,
  isLink,
  isButton,
  remove,
  handleRemove,
}: Props) => {
  const content = (
    <>
      <div className='flex-center space-x-2'>
        <span>{name}</span>
      </div>

      {remove && (
        <Image
          src='/icons/close.svg'
          width={12}
          height={12}
          alt='close icon'
          className='cursor-pointer object-contain invert-0 dark:invert'
          onClick={handleRemove}
        />
      )}

      {showCount && (
        <p className='small-medium text-dark500_light700'>{posts}</p>
      )}
    </>
  )

  if (isLink) {
    return (
      <Link className={classes} href={Routes.Tag(_id)}>
        {content}
      </Link>
    )
  }

  if (isButton) {
    return (
      <Button type='button' className={classes}>
        {content}
      </Button>
    )
  }

  return <div className={classes}>{content}</div>
}
