import Link from 'next/link'

import Routes from '@/constants/routes'
import { IPost } from '@/interfaces/post.interfaces'
import { TagCard } from '@/modules/tags/components'

export const PostCard = ({
  title,
  image,
  content,
  tags,
  views,
  commentsCount,
  likes,
  createdAt,
  categories,
}: IPost) => {
  // Todo либо использовать getTimeStamp fn from utils
  const formattedDate = new Date(createdAt).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const previewContent =
    content.length > 100 ? content.slice(0, 100) + '...' : content

  return (
    <Link
      href={Routes.Posts}
      className='m-5 flex max-w-xs flex-col overflow-hidden rounded-lg bg-white shadow-md'
    >
      <img
        src={image}
        alt={title}
        className='h-48 w-full border-b-2 border-gray-200 object-cover'
      />
      <div className='p-4'>
        <h3 className='mb-2 text-xl font-bold text-gray-800'>{title}</h3>
        <div className='mt-3 flex flex-wrap gap-2'>
          {categories.map((cat, index) => (
            <span
              key={index}
              className='rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700'
            >
              {cat}
            </span>
          ))}
        </div>
        <p className='mb-4 text-base text-gray-600'>{previewContent}</p>
        <div className='flex justify-between text-sm text-gray-500'>
          <span className='italic'>{formattedDate}</span>
          <div className='flex gap-4'>
            <span className='flex items-center'>👁 {views}</span>
            <span className='flex items-center'>💬 {commentsCount}</span>
            <span className='flex items-center'>❤️ {likes}</span>
          </div>
        </div>
        <div className='mt-3 flex flex-wrap gap-2'>
          {tags &&
            tags.length > 0 &&
            tags.map((tag) => (
              <TagCard
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                showCount={false}
              />
            ))}
        </div>
      </div>
    </Link>
  )
}
