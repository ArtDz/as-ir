import { Container } from '@/components/template/Container'
import { IPost } from '@/interfaces/post.interfaces'
import { HomeFilter } from '@/modules/filters/components'
import { PostCard } from '@/modules/posts/components'
import { LocalSearch } from '@/modules/search/components'

const fakePosts: IPost[] = [
  {
    _id: '1',
    author: { _id: '1', name: 'Btr', image: '' },
    title: 'Как улучшить продуктивность на работе',
    image: 'https://via.placeholder.com/350x200?text=Image+1',
    content:
      'В этой статье мы рассмотрим несколько советов по улучшению продуктивности на работе...',
    tags: [
      { _id: '1', name: 'Продуктивность' },
      { _id: '2', name: 'Работа' },
    ],
    views: 1200,
    commentsCount: 34,
    likes: 150,
    createdAt: new Date('2025-03-01T12:00:00Z'),
    categories: ['наука', 'публицистика'],
  },
  {
    _id: '2',
    author: { _id: '1', name: 'Btr', image: '' },
    title: '10 лучших книг по саморазвитию',
    image: 'https://via.placeholder.com/350x200?text=Image+2',
    content:
      'Если вы хотите развиваться, вот список книг, которые стоит прочитать каждому...',
    tags: [
      { _id: '1', name: 'Продуктивность' },
      { _id: '2', name: 'Работа' },
    ],
    views: 950,
    commentsCount: 21,
    likes: 87,
    createdAt: new Date('2025-02-15T15:30:00Z'),
    categories: ['наука', 'публицистика'],
  },
  {
    _id: '3',
    author: { _id: '1', name: 'Btr', image: '' },
    title: 'Что такое машинное обучение?',
    image: 'https://via.placeholder.com/350x200?text=Image+3',
    content:
      'Машинное обучение – это область искусственного интеллекта, изучающая алгоритмы...',
    tags: [
      { _id: '1', name: 'Продуктивность' },
      { _id: '2', name: 'Работа' },
    ],
    views: 1820,
    commentsCount: 56,
    likes: 250,
    createdAt: new Date('2025-01-30T08:45:00Z'),
    categories: ['наука', 'публицистика'],
  },
  {
    _id: '4',
    author: { _id: '1', name: 'Btr', image: '' },
    title: 'Гид по здоровому питанию для начинающих',
    image: 'https://via.placeholder.com/350x200?text=Image+4',
    content:
      'Хотите начать питаться правильно, но не знаете с чего начать? Мы подготовили руководство...',
    tags: [
      { _id: '1', name: 'Продуктивность' },
      { _id: '2', name: 'Работа' },
    ],
    views: 740,
    commentsCount: 13,
    likes: 45,
    createdAt: new Date('2025-03-10T10:00:00Z'),
    categories: ['наука', 'публицистика'],
  },
  {
    _id: '5',
    author: { _id: '1', name: 'Btr', image: '' },
    title: 'Как научиться быстро читать?',
    image: 'https://via.placeholder.com/350x200?text=Image+5',
    content:
      'Чтение – это ключ к успеху, а быстрая скорость чтения позволяет нам усваивать информацию быстрее...',
    tags: [
      { _id: '1', name: 'Продуктивность' },
      { _id: '2', name: 'Работа' },
    ],
    views: 650,
    commentsCount: 11,
    likes: 30,
    createdAt: new Date('2025-03-12T14:20:00Z'),
    categories: ['наука', 'публицистика'],
  },
]

const Home = async () => {
  return (
    <Container>
      <p>Последние публикации</p>
      <section className='flex-between gap-6'>
        <LocalSearch
          route='/'
          imgSrc='/icons/search.svg'
          placeholder='Поиск...'
          className='flex-1'
        />
        <HomeFilter />
      </section>
      <div className='flex-between gap-6'>
        {fakePosts.map((post) => (
          <PostCard key={post._id} {...post} />
        ))}
      </div>
    </Container>
  )
}

export default Home
